import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OrganizationByWeekContext } from './organization-by-week.context';
import { FrameworkGridComponent } from '../../../../framework/grid';

@Component({
  selector: 'license-organization-by-week',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './organization-by-week.component.html',
  styleUrl: './organization-by-week.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationByWeekComponent {
  context = OrganizationByWeekContext;
}
