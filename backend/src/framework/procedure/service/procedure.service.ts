import { ProcedureExecutor } from '../executor/procedure.executor';
import { LoggerService } from '../../logger';

export class ProcedureService {
  private readonly executor: ProcedureExecutor;
  private readonly logger: LoggerService;

  constructor(executor: ProcedureExecutor, logger: LoggerService) {
    this.executor = executor;
    this.logger = logger;
  }

  async execute<T>(sql: string): Promise<T[]> {
    const start = Date.now();
    try {
      const rows = await this.executor.execute<T>(sql);
      this.logger.info('Procedure executed', {
        sql: sql.substring(0, 100),
        duration: Date.now() - start,
        rows: rows.length,
      });
      return rows;
    } catch (error) {
      this.logger.error('Procedure execution failed', {
        sql: sql.substring(0, 100),
        duration: Date.now() - start,
        error: String(error),
      });
      throw error;
    }
  }

  async executeRaw<T>(sql: string): Promise<T[]> {
    const start = Date.now();
    try {
      const rows = await this.executor.executeRaw<T>(sql);
      this.logger.info('Raw SQL executed', {
        sql: sql.substring(0, 100),
        duration: Date.now() - start,
        rows: rows.length,
      });
      return rows;
    } catch (error) {
      this.logger.error('Raw SQL execution failed', {
        sql: sql.substring(0, 100),
        duration: Date.now() - start,
        error: String(error),
      });
      throw error;
    }
  }
}
