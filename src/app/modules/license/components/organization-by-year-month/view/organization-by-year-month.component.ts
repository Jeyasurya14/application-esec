import { Component } from '@angular/core';
import { FrameworkGridComponent } from '../../../../../framework/grid';
import { organizationByYearMonthContext } from '../definition/organization-by-year-month.context';

@Component({
  selector: 'license-organization-by-year-month',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './organization-by-year-month.component.html',
  styleUrl: './organization-by-year-month.component.scss',
})
export class OrganizationByYearMonthComponent {
  context = organizationByYearMonthContext;
}
