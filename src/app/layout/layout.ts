import { Component, signal } from '@angular/core';
import { HeaderComponent } from './header/header';
import { SidebarComponent } from './navigation/sidebar/sidebar';
import { SidebarPanel } from './navigation/sidebar-panel/sidebar-panel';
import { StatusBarComponent } from './status-bar/status-bar';

// import { WorkspaceComponent } from './workspace/workspace';
// import { PeriodPreset } from '../core/models/period.model';

import { getPeriodPresets} from '../core/services/period-preset.util';
import { WorkspaceUi } from '../framework/workspace/workspace-ui/workspace-ui';
import { ContextMenu } from '../framework/context-menu/context-menu';

@Component({
  selector: 'app-layout',
  standalone:true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    StatusBarComponent,
    // WorkspaceComponent,
    SidebarPanel,
    WorkspaceUi,
    ContextMenu
],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class LayoutComponent {
  // protected readonly periods: PeriodPreset[] = [
  //   { id: 'today', label: 'Today', kind: 'rolling-days', days: 1 },
  //   { id: 'week', label: 'This Week', kind: 'week' },
  //   { id: 'ytd', label: 'YTD', kind: 'ytd' },
  //   ...getQuarterPresets(),
  //   ...getYearPresets(),
  // ];

  // protected readonly periods = getPeriodPresets()
  // protected readonly selectedPreset = this.periods.find(p => p.id === 'ytd')! ;

  protected readonly periods = signal(getPeriodPresets())
  protected readonly selectedPreset = signal(this.periods().find(p => p.id === 'ytd'))
}
