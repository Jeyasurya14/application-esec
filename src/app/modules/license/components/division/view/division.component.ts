import { Component } from '@angular/core';
import { FrameworkGridComponent } from '../../../../../framework/grid';
import { divisionContext } from '../definition';

@Component({
  selector: 'license-division',
  standalone: true,
  imports: [FrameworkGridComponent],
  templateUrl: './division.component.html',
  styleUrl: './division.component.scss',
})
export class DivisionComponent {
  context = divisionContext;
}
