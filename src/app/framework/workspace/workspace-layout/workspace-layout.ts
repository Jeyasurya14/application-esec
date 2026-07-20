import { Component, ChangeDetectionStrategy } from '@angular/core';
import { StatusBarComponent } from '../../../layout/status-bar/status-bar';

@Component({
  selector: 'app-workspace-layout',
  standalone: true,
  templateUrl: './workspace-layout.html',
  styleUrl: './workspace-layout.scss',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceLayout {}
