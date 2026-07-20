import { ProcedureService as FrameworkProcedureService } from '../../../framework/procedure';
import { ProcedureDto } from '../model';

export class ProcedureModuleService {
  private readonly framework: FrameworkProcedureService;

  constructor(framework: FrameworkProcedureService) {
    this.framework = framework;
  }

  async execute<T>(dto: ProcedureDto): Promise<T[]> {
    return this.framework.execute<T>(dto.sql);
  }
}
