import { MySqlService } from '../../../framework/database';
import { Screen } from '../model/screen.model';

export class ScreenService {
  private readonly mysql: MySqlService;

  constructor(mysql: MySqlService) {
    this.mysql = mysql;
  }

  async load(module: string, screen: string): Promise<Screen> {
    const rows = await this.mysql.query<Screen>(
      `SELECT *
            FROM screens
            WHERE module=?
            AND id=?`,
      [module, screen],
    );
    return rows[0];
  }
}
