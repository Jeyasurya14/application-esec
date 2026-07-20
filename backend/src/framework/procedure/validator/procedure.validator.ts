import { ValidationException } from '../../exceptions';

const callRegex = /^CALL\s+[a-zA-Z_][a-zA-Z0-9_.]*(?:\s*\(.*\))?\s*;?\s*$/i;

export class ProcedureValidator {
  validate(sql: string): void {
    if (!sql || !sql.trim()) {
      throw new ValidationException('SQL must not be empty');
    }
    if (!callRegex.test(sql.trim())) {
      throw new ValidationException('Only CALL statements are allowed');
    }
    if (sql.length > 10000) {
      throw new ValidationException('SQL exceeds maximum length of 10000 characters');
    }
  }
}
