import { logger } from '../logger';

// Log Request middleware
export default async function logRequest(req: any, res: any, next: () => void) {
  logger.silly('Request', {
    method: req.method,
    url: req.url
  });
  next();
}
