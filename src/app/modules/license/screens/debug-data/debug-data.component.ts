import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { debugDataContext } from './debug-data.context';

@Component({
  selector: 'license-debug-data',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './debug-data.component.html',
  styleUrl: './debug-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugDataComponent {
  context = debugDataContext;
}
