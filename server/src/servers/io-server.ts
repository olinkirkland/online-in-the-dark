import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import { EventsMap } from 'socket.io/dist/typed-events';
import { ActiveGame, OperationType } from '../controllers/active-game';
import { logger } from '../logger';
import { REFRESH_TOKEN_SECRET, TICK_RATE } from '../util/config';
import { origin } from './rest-server';

export class IOServer {
  private static instance: IOServer | null;

  private io: Server | null;

  private constructor() {}

  public start(server: EventsMap) {
    this.io = new Server(server, {
      cors: {
        origin,
        methods: ['GET', 'POST']
      }
    });

    this.io.on('connection', async (socket) => {
      try {
        const gameId: string = socket.handshake.query.gameId as string;
        const token: string = socket.handshake.query.token as string;

        if (!gameId || !token) {
          logger.warn('Missing gameId or token', { id: socket.id });
          socket.disconnect();
          return;
        }

        const userId: string = await new Promise((resolve) => {
          jwt.verify(
            token as string,
            REFRESH_TOKEN_SECRET,
            (err: any, data: any) => {
              if (err)
                return logger.error(
                  'Error verifying token on socket connection',
                  {
                    error: err.message,
                    token
                  }
                );

              resolve(data.id);
            }
          );
        });

        logger.info('Socket connected', {
          id: socket.id,
          gameId,
          token
        });

        // Get the active game
        const activeGame = await ActiveGame.activateGame(gameId);
        // TODO: Is the user authorized to join the game?
        // if (!game.state.players.find(player => player.playerId === userId)

        // Create or join the game's room
        socket.join(gameId);

        // Send the player a copy of the game state as a patch
        socket.emit('patch', {
          patches: [
            {
              op: OperationType.REPLACE,
              path: '',
              value: activeGame.state
            }
          ]
        });

        // Mark the player as online
        activeGame.addToPatchQueue({
          op: OperationType.REPLACE,
          path: `/players/${userId}/isOnline`,
          value: true
        });

        socket.on('disconnect', () => {
          logger.info('Socket disconnected', { id: socket.id });

          // Mark the player as offline
          activeGame.addToPatchQueue({
            op: OperationType.REPLACE,
            path: `/players/${userId}/isOnline`,
            value: false
          });
        });
      } catch (error) {
        logger.error('Socket error', { error });
      }
    });

    setInterval(this.applyAndBroadcastPatchQueues, TICK_RATE);
    setInterval(this.saveActiveGames, TICK_RATE * 100);

    return server;
  }

  public applyAndBroadcastPatchQueues() {
    ActiveGame.activeGames.forEach((game) => {
      game.applyPatchQueueAndBroadcast();
    });
  }

  public saveActiveGames() {
    ActiveGame.activeGames.forEach((game) => {
      game.save();

      // Deactivate the game if there are no online players
      const players = Object.values(game.state.players);
      if (!players.find((player: any) => player.isOnline))
        ActiveGame.deactivateGame(game.gameId);
    });
  }

  public broadcast(gameId: string, data: any, channel = 'patch') {
    this.io?.to(gameId).emit(channel, data);
  }

  public static getInstance(): IOServer {
    if (!IOServer.instance) IOServer.instance = new IOServer();
    return IOServer.instance;
  }
}
