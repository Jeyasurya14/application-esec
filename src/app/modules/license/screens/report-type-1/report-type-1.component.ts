import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { reportType1Context } from './report-type-1.context';

@Component({
  selector: 'license-report-type-1',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './report-type-1.component.html',
  styleUrl: './report-type-1.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportType1Component {
  context = reportType1Context;
}
