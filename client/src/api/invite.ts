import LoadingModal from '@/components/modals/modal-content/LoadingModal.vue';
import ModalController from '@/controllers/modal-controller';
import { PageName, router } from '@/router';
import { useUserStore } from '@/stores/user-store';
import { HttpStatusCode } from 'axios';
import { server } from './connection';

export async function acceptInvite(code: string) {
  ModalController.open(LoadingModal);
  try {
    const response = await server.post(`/invite/${code}`);
    if (response.status === HttpStatusCode.Ok) {
      const gameId = response.data.gameId;
      // Redirect to the game's page
      router.push({ name: PageName.GAME, params: { id: gameId } });
    }
  } catch (error) {
    console.error(error);
    router.push({ name: PageName.HOME });
    ModalController.close();
    // TODO: Open Modal with error message
    // ModalController.open(Modal)
    return;
  }
  ModalController.close();
}
