import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FrameworkGridComponent } from '../../../../../framework/grid';
import { agentLinuxContext } from '../definition/agent-linux.context';
import { enviroment } from '../../../../../../environments/environment';

@Component({
  selector: 'dashboard-agent-linux',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './agent-linux.component.html',
  styleUrl: './agent-linux.component.scss',
})
export class AgentLinuxComponent {
  readonly context = agentLinuxContext;
  private readonly http = inject(HttpClient);

  constructor() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 8);
    const sql = `CALL R_MG_MENU_CLICK('webtest123', ${JSON.stringify(date)}, ${JSON.stringify(time)}, 'Dashboard#Agent (Linux)', '', 'INSERT')`;
    console.log(sql)
    this.http.post(`${enviroment.api.baseUrl}/post_insert_update`, { sql }).subscribe();
  }
}
