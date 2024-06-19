import mongoose, { Schema } from 'mongoose';

export type User = {
  createdAt: Date;
  username: string;
  password: string;
  portrait: string;
  isGuest: boolean;
  games: string[];
};

export type UserDocument = User & mongoose.Document;

const UserSchema = new Schema<UserDocument>({
  createdAt: Date,
  username: String,
  password: String,
  portrait: String,
  isGuest: Boolean,
  games: [String]
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
