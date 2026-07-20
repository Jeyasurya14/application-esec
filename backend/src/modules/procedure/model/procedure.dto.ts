import { ProcedureContext } from './procedure-context.dto';

export interface ProcedureDto {
  sql: string;
  context?: ProcedureContext;
}
