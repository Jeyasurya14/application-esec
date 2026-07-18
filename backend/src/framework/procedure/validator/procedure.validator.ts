import { ValidationException } from '../../exceptions';

export class ProcedureValidator {
  validate(sql: string): void {
    if (!sql || !sql.trim()) {
      throw new ValidationException('SQL must not be empty');
    }
    if (!sql.trim().toLowerCase().startsWith('call')) {
      throw new ValidationException('Only stored procedures (CALL statements) are allowed');
    }
    if (sql.length > 10000) {
      throw new ValidationException('SQL exceeds maximum length of 10000 characters');
    }
  }
}
