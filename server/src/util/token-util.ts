import jwt, { JwtPayload } from 'jsonwebtoken';
import { logger } from '../logger';
import {
  ACCESS_TOKEN_EXPIRATION,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET
} from './config';

export function makeAccessToken(id: string) {
  return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION
  });
}

export function makeRefreshToken(id: string) {
  const token = jwt.sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION
  });
  return token;
}

export async function verifyRefreshToken(
  refreshToken: string
): Promise<JwtPayload | null> {
  try {
    const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as JwtPayload;
    return data;
  } catch (err) {
    logger.error('Error verifying refresh token', { error: err, refreshToken });
    return null;
  }
}
