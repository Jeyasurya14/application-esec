import { ResultSetHeader } from 'mysql2/promise';

import { MySqlPool } from './mysql.pool';

import { DataException } from './mysql.exception';
import { SqlParameters } from './mysql.types';

export class MySqlService {
  async query<T>(sql: string, parameters: SqlParameters = []): Promise<T[]> {
    try {
      const [rows] = await MySqlPool.pool.query(sql, parameters);
      return rows as T[];
    } catch (error) {
      throw new DataException(String(error));
    }
  }

  async execute(
    sql: string,

    parameters: SqlParameters = [],
  ): Promise<ResultSetHeader> {
    try {
      const [result] = await MySqlPool.pool.execute(sql, parameters);

      return result as ResultSetHeader;
    } catch (error) {
      throw new DataException(String(error));
    }
  }

  async getConnection() {
    return await MySqlPool.pool.getConnection();
  }
}
