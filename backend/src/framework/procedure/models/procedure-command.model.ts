import { SqlParameters } from '../../database/mysql.types';

export interface ProcedureCommand {
  sql: string;
  parameters?: SqlParameters;
}
