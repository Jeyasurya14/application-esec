import { Request, Response, NextFunction } from 'express';
import { Container } from '../di';
import { TOKENS } from '../di/injector';
import { LoggerService } from '../logger';

export function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on('finish', () => {
    const logger = Container.getInstance().resolve<LoggerService>(TOKENS.LOGGER_SERVICE);
    const duration = Date.now() - start;

    logger.info(`${req.method} ${req.path} ${res.statusCode}`, {
      requestId: req.requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
    });
  });

  next();
}
