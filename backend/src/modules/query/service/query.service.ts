import { ProcedureService } from '../../../framework/procedure';

export class QueryModuleService {
  private readonly procedure: ProcedureService;

  constructor(procedure: ProcedureService) {
    this.procedure = procedure;
  }

  async execute<T>(sql: string): Promise<T[]> {
    return await this.procedure.execute<T>(sql);
  }
}
