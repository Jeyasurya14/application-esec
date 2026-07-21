import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { departmentContext } from './department.context';

@Component({
  selector: 'license-department',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './department.component.html',
  styleUrl: './department.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentComponent {
  context = departmentContext;
}
