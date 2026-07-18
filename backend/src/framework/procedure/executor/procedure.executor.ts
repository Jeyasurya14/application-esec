import { MySqlService } from '../../database';
import { ProcedureParser } from '../parser/procedure.parser';
import { ProcedureValidator } from '../validator/procedure.validator';

export class ProcedureExecutor {
  private readonly mysql: MySqlService;
  private readonly validator: ProcedureValidator;
  private readonly parser: ProcedureParser;

  constructor(mysql: MySqlService, validator: ProcedureValidator, parser: ProcedureParser) {
    this.mysql = mysql;
    this.validator = validator;
    this.parser = parser;
  }

  async execute<T>(sql: string): Promise<T[]> {
    this.validator.validate(sql);
    const normalizedSql = this.parser.normalize(sql);
    const rows = await this.mysql.query<any>(normalizedSql);
    console.log('executor',rows)
    if (Array.isArray(rows) && rows.length > 0 && Array.isArray(rows[0])) {
      return rows[0] as T[];
    }
    return rows as T[];
  }
}
