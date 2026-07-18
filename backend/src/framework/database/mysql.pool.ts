import mysql, { Pool } from 'mysql2/promise';
import { MYSQL_POOL } from './mysql.constants';
import { env } from '../../config/environment';

export class MySqlPool {
  private static instance: Pool;

  static get pool(): Pool {
    if (!this.instance) {
      this.instance = mysql.createPool({
        host: env.mysql.host,
        port: env.mysql.port,
        user: env.mysql.user,
        password: env.mysql.password,
        database: env.mysql.database,
        ...MYSQL_POOL,
      });
    }
    return this.instance;
  }
}
