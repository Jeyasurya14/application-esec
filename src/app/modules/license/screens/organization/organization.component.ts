import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { organizationContext } from './organization.context';

@Component({
  selector: 'license-organization',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationComponent {
  context = organizationContext;
}
