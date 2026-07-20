import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';
import { INoRowsOverlayParams } from 'ag-grid-community';
import { GridStateService } from '../../../services/grid-state.service';

@Component({
  selector: 'framework-grid-error-overlay',
  standalone: true,
  templateUrl: './grid-error-overlay.component.html',
  styleUrl: './grid-error-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridErrorOverlayComponent implements INoRowsOverlayAngularComp {
  private readonly state = inject(GridStateService);
  readonly message = this.state.error;

  agInit(_params: INoRowsOverlayParams): void {}
}
