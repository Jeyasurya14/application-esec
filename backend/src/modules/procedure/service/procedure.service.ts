import { ProcedureService as FrameworkProcedureService } from '../../../framework/procedure';

export class ProcedureModuleService {
  private readonly framework: FrameworkProcedureService;

  constructor(framework: FrameworkProcedureService) {
    this.framework = framework;
  }

  async execute<T>(sql: string): Promise<T[]> {
    return this.framework.execute<T>(sql);
  }
}
