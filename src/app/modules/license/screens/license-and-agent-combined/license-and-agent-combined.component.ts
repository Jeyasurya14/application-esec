import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { licenseAndAgentCombinedContext } from './license-and-agent-combined.context';

@Component({
  selector: 'license-license-and-agent-combined',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './license-and-agent-combined.component.html',
  styleUrl: './license-and-agent-combined.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LicenseAndAgentCombinedComponent {
  context = licenseAndAgentCombinedContext;
}
