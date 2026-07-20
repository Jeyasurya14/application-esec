import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { organizationByYearMonthContext } from './organization-by-year-month.context';

@Component({
  selector: 'license-organization-by-year-month',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './organization-by-year-month.component.html',
  styleUrl: './organization-by-year-month.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrganizationByYearMonthComponent {
  context = organizationByYearMonthContext;
}
