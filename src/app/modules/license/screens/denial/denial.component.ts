import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { denialContext } from './denial.context';

@Component({
  selector: 'license-denial',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './denial.component.html',
  styleUrl: './denial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DenialComponent {
  context = denialContext;
}
