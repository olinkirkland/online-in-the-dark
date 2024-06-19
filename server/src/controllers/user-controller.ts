import { logger } from '../logger';
import { UserModel } from '../models/user';

export async function deleteExpiredGuestUsers(expirationDate: Date) {
  try {
    const numberOfDeletedUsers = await UserModel.deleteMany({
      isGuest: true,
      createdAt: { $lt: expirationDate.getTime() }
    });

    logger.info(
      `Deleted guest users older than ${expirationDate.toLocaleDateString()} (${
        numberOfDeletedUsers.deletedCount
      } users deleted)`
    );
  } catch (error) {
    throw new Error(`Error deleting expired guest users: ${error}`);
  }
}

export async function deleteUser(id: string) {
  try {
    await UserModel.deleteOne({ id });
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
}
