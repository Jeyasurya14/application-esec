import { MySqlService } from '../../database';
import { ProcedureValidator } from '../validator/procedure.validator';
import { ValidationException } from '../../exceptions';

export class ProcedureExecutor {
  private readonly mysql: MySqlService;
  private readonly validator: ProcedureValidator;

  constructor(mysql: MySqlService, validator: ProcedureValidator) {
    this.mysql = mysql;
    this.validator = validator;
  }

  async execute<T>(sql: string): Promise<T[]> {
    this.validator.validate(sql);
    const { procedure, params } = this.parseCall(sql);
    const placeholders = params.map(() => '?').join(', ');
    const parameterizedSql = `CALL ${procedure}(${placeholders})`;
    const rows = await this.mysql.query<any>(parameterizedSql, params);
    if (Array.isArray(rows) && rows.length > 0 && Array.isArray(rows[0])) {
      return rows[0] as T[];
    }
    return rows as T[];
  }

  async executeRaw<T>(sql: string): Promise<T[]> {
    const rows = await this.mysql.query<any>(sql);
    if (Array.isArray(rows) && rows.length > 0 && Array.isArray(rows[0])) {
      return rows[0] as T[];
    }
    return rows as T[];
  }

  private parseCall(sql: string): { procedure: string; params: string[] } {
    const normalized = sql.trim().replace(/;$/g, '').replace(/\s+/g, ' ');
    const match = normalized.match(/^CALL\s+([a-zA-Z_][a-zA-Z0-9_.]*)\s*\((.*)\)\s*$/i);
    if (!match) {
      const noParens = normalized.match(/^CALL\s+([a-zA-Z_][a-zA-Z0-9_.]*)\s*$/i);
      if (noParens) {
        return { procedure: noParens[1], params: [] };
      }
      throw new ValidationException('Invalid CALL statement format');
    }

    const procedure = match[1];
    const paramsStr = match[2].trim();
    const params: string[] = [];

    if (paramsStr) {
      let i = 0;
      while (i < paramsStr.length) {
        if (paramsStr[i] === ' ' || paramsStr[i] === ',') {
          i++;
          continue;
        }
        if (paramsStr[i] === "'") {
          let j = i + 1;
          let value = '';
          while (j < paramsStr.length) {
            if (paramsStr[j] === "'") {
              if (j + 1 < paramsStr.length && paramsStr[j + 1] === "'") {
                value += "'";
                j += 2;
              } else {
                break;
              }
            } else {
              value += paramsStr[j];
              j++;
            }
          }
          params.push(value);
          i = j + 1;
        } else if (paramsStr.substring(i, i + 4).toUpperCase() === 'NULL') {
          params.push('');
          i += 4;
        } else {
          let j = i;
          while (j < paramsStr.length && paramsStr[j] !== ',' && paramsStr[j] !== ' ') j++;
          params.push(paramsStr.substring(i, j));
          i = j;
        }
      }
    }

    return { procedure, params };
  }
}
