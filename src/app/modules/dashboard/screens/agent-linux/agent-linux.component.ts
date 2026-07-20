import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { SubTabHostComponent } from '../../../../shared/sub-tab-host';
import { agentLinuxSubTabs } from './agent-linux.tabs';

@Component({
  selector: 'dashboard-agent-linux',
  imports: [SubTabHostComponent],
  templateUrl: './agent-linux.component.html',
  styleUrl: './agent-linux.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentLinuxComponent {
  readonly subTabs = agentLinuxSubTabs;
  private readonly http = inject(HttpClient);

  constructor() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 8);
    const sql = `CALL R_MG_MENU_CLICK('webtest123', ${JSON.stringify(date)}, ${JSON.stringify(time)}, 'Dashboard#Agent (Linux)', '', 'INSERT')`;
    this.http.post(`${environment.api.baseUrl}/post_insert_update`, { sql }).subscribe();
  }
}
