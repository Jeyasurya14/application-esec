import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { computerContext } from './computer.context';

@Component({
  selector: 'license-computer',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './computer.component.html',
  styleUrl: './computer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComputerComponent {
  context = computerContext;
}
