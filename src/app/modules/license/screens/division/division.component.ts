import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FrameworkGridComponent } from '../../../../framework/grid';
import { divisionContext } from './division.context';

@Component({
  selector: 'license-division',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './division.component.html',
  styleUrl: './division.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DivisionComponent {
  context = divisionContext;
}
