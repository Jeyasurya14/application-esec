import { ProcedureService } from '../../../framework/procedure';

export class UpdateModuleService {
  private readonly procedure: ProcedureService;

  constructor(procedure: ProcedureService) {
    this.procedure = procedure;
  }

  async execute(sql: string): Promise<unknown> {
    return await this.procedure.execute(sql);
  }
}
