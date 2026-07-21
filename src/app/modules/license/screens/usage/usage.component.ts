import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { UsageSubTabs } from './usage.tabs';
import { SubTabHostComponent } from "../../../../shared/sub-tab-host";

@Component({
  selector: 'license-usage',
  standalone: true,
  imports: [ SubTabHostComponent],
  templateUrl: './usage.component.html',
  styleUrl: './usage.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsageComponent {
  readonly subTabs =UsageSubTabs
}
