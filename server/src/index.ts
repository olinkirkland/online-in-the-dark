import dotenv from 'dotenv';
import { createServer } from 'http';
import mongoose from 'mongoose';
import { deleteExpiredGuestUsers } from './controllers/user-controller';
import { logger } from './logger';
import { GameModel } from './models/game';
import { UserModel } from './models/user';
import { IOServer } from './servers/io-server';
import RestServer from './servers/rest-server';

initialize();

async function initialize() {
  // Env variables
  dotenv.config();

  if (!process.env.DB_URI) return console.error('DB_URI not set');

  logger.info('Connecting to MongoDB ...');
  await mongoose.connect(process.env.DB_URI);

  if (false) {
    await UserModel.deleteMany({});
    await GameModel.deleteMany({});
    logger.info('Deleted all users and games');
  }

  const guestsCount = await UserModel.countDocuments({ isGuest: true });
  const registeredUsersCount = await UserModel.countDocuments({
    isGuest: false
  });
  logger.info('Connected to MongoDB', {
    guestsCount,
    registeredUsersCount,
    gamesCount: await GameModel.countDocuments()
  });

  // Start the guest user cleanup job
  cleanupGuests();
  setInterval(cleanupGuests, 1000 * 60 * 60); // Run every hour

  // Start REST server
  const restServer = RestServer.getInstance();
  const app = restServer.getApp();

  // Start SocketIO server
  const ioServer = IOServer.getInstance();
  const server = createServer(app);
  ioServer.start(server);

  const port = process.env.PORT || 3005;
  server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
}

function cleanupGuests() {
  const days = parseInt(process.env.GUEST_USER_EXPIRATION_DAYS) || 7;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() - days);
  deleteExpiredGuestUsers(expirationDate);
}
