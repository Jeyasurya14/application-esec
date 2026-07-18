export class ProcedureParser {
  normalize(sql: string): string {
    return sql.trim().replace(/\s+/g, ' ').replace(/;$/g, '');
  }
}
