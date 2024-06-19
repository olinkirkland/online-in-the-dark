import { HttpStatusCode } from 'axios';
import { logger } from '../logger';
import { GameDocument, GameModel } from '../models/game';
import { UserDocument, UserModel } from '../models/user';

export default async function identifyUser(req: any, res: any, next: any) {
  const { id } = req;
  let user: UserDocument | null = null;
  try {
    user = await UserModel.findOne({ _id: id });
  } catch {}

  if (!user) {
    logger.error('User not found', { userId: id });
    return res.status(HttpStatusCode.NotFound).send();
  }

  req.user = user;
  next();
}

export async function identifyGame(req: any, res: any, next: any) {
  const { gameId } = req.params;
  if (!gameId)
    return res
      .status(HttpStatusCode.BadRequest)
      .send('Missing game ID parameter');

  let game: GameDocument | null = null;
  try {
    game = await GameModel.findOne({ _id: gameId });
  } catch {
    logger.error('Game not found', { gameId });
    return res.status(HttpStatusCode.InternalServerError).send();
  }

  if (!game)
    return res
      .status(HttpStatusCode.NotFound)
      .send(`Game not found: ${gameId}`);

  if (!game.players[req.user.id])
    return res
      .status(HttpStatusCode.Forbidden)
      .send('You are not a player in this game');

  if (!game) {
    logger.error('Game not found', { gameId });

    return res
      .status(HttpStatusCode.NotFound)
      .send(`Game not found: ${gameId}`);
  }

  req.game = game;
  next();
}
