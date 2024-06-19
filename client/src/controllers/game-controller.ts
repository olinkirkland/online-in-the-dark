import { BASE_URL, server } from '@/api/connection';
import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import { useGameStore } from '@/stores/game-store';
import { useTokenStore } from '@/stores/token-store';
import { Game } from '@/types/game';
import { Operation, applyPatch } from 'fast-json-patch';
import { Socket, io } from 'socket.io-client';
import ModalController from './modal-controller';
import InfoModal from '@/components/modals/modal-content/InfoModal.vue';

export enum SocketMessageType {
  PATCH = 'patch'
}

let socket: Socket | null = null;

export function connectToGame(gameId: string) {
  console.log('@game-controller: connectToGame');
  ModalController.open(LoadingModal);
  if (socket) {
    socket.disconnect();
    socket = null;
  }

  const socketOptions = {
    query: {
      gameId,
      token: useTokenStore().refreshToken
    }
  };

  socket = io(BASE_URL, socketOptions);
  socket.on('connect', onConnect);
  socket.on('disconnect', onDisconnect);
  socket.on('patch', onReceivePatch);
  socket.on('error', onError);

  ModalController.close();
}

export function disconnectFromGame() {
  if (socket) {
    socket.disconnect();
    socket = null;
    useGameStore().clear();
  }
}

function onReceivePatch(data: { patches: Operation[] }) {
  try {
    const { patches } = data;
    console.log('patch:', patches);
    useGameStore().game = applyPatch(
      useGameStore().game || ({} as Game),
      patches
    ).newDocument;
  } catch (error) {
    console.error('Failed to patch:', error);
    return;
  }
}

function onConnect() {
  console.log('onOpen');
}

function onDisconnect() {
  console.log('onClose');
  ModalController.open(InfoModal, {
    title: 'Disconnected',
    message:
      'You have been disconnected from the game. Please try to reconnect.',
    onClose: () => {
      ModalController.open(LoadingModal);
      location.reload();
    }
  });
}

function onError(error: any) {
  console.log('onError:', error);
  ModalController.open(InfoModal, {
    title: 'Network Error',
    message: 'A network error occurred.'
  });
}

export async function patch(patches: Operation[]) {
  // Send a patch by rest request
  await server.patch(`/game/${useGameStore().game?._id}`, patches);
}
