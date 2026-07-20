import { Component, ChangeDetectionStrategy } from '@angular/core';
import { agentWindowsContext } from './agent-windows.context';
import { FrameworkGridComponent } from '../../../../framework/grid';

@Component({
  selector: 'dashboard-agent-windows',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './agent-windows.component.html',
  styleUrl: './agent-windows.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgentWindowComponent {
  context = agentWindowsContext;
}
