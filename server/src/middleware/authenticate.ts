import { HttpStatusCode } from 'axios';
import jwt from 'jsonwebtoken';
import { logger } from '../logger';
import { ACCESS_TOKEN_SECRET } from '../util/config';

export default function authenticate(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    logger.error('No token provided', { authHeader });
    return res.status(HttpStatusCode.Unauthorized).send();
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, data: any) => {
    if (err) {
      logger.warn('Failed to authenticate token', {
        error: err.message,
        token
      });
      return res.status(HttpStatusCode.Unauthorized).send();
    }

    req.id = data.id;
    next();
  });
}
