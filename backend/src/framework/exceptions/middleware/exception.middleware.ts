import { NextFunction, Response, Request } from 'express';
import { AppException } from '../model';
import { ResponseBuilder } from '../../response/builder/response.builder';
import { Container, TOKENS } from '../../di';
import { LoggerService } from '../../logger';

export function exceptionMiddleware(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logger = Container.getInstance().resolve<LoggerService>(TOKENS.LOGGER_SERVICE);

  if (error instanceof AppException) {
    logger.warn(`Request failed: ${error.message}`, {
      status: error.status,
      path: req.path,
    });
    return ResponseBuilder.error(res, error.message, error.status);
  }

  logger.error('Unhandled error', {
    error: String(error),
    path: req.path,
    method: req.method,
  });

  return ResponseBuilder.error(res, 'Internal Server Error', 500);
}
