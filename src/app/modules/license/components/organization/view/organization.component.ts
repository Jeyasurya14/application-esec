import { Component } from '@angular/core';
import { FrameworkGridComponent } from '../../../../../framework/grid';
import { organizationContext } from '../definition/organization.context';

@Component({
  selector: 'license-organization',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
})
export class OrganizationComponent {
  context = organizationContext;
}
