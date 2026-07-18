import winston from 'winston';
import { LogContext, LogLevel } from './logger.types';

export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      defaultMeta: { service: 'esms' },
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
              const context = Object.keys(meta).length > 1 ? ` ${JSON.stringify(meta)}` : '';
              return `${timestamp} [${level}]: ${message}${context}`;
            }),
          ),
        }),
      ],
    });
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    this.logger.log(level, message, context ?? {});
  }

  info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: LogContext): void {
    this.log('error', message, context);
  }

  debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }
}
