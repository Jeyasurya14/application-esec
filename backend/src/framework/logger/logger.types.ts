export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface LogContext {
  requestId?: string;
  userId?: string;
  procedure?: string;
  duration?: number;
  rows?: number;
  [key: string]: unknown;
}
