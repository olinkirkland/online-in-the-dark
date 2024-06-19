import dotenv from 'dotenv';

dotenv.config();

export const DB_URI = process.env.DB_URI;
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || 'default';
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'default';
export const REFRESH_TOKEN_EXPIRATION =
  process.env.REFRESH_TOKEN_EXPIRATION || '1d';
export const ACCESS_TOKEN_EXPIRATION =
  process.env.ACCESS_TOKEN_EXPIRATION || '15m';
export const TICK_RATE = parseInt(process.env.TICK_RATE) || 200;
