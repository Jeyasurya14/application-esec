import { Component } from '@angular/core';
import { ILoadingOverlayAngularComp } from 'ag-grid-angular';
import { ILoadingOverlayParams } from 'ag-grid-community';

@Component({
  selector: 'framework-grid-loading-overlay',
  standalone: true,
  templateUrl: './grid-loading-overlay.component.html',
  styleUrl: './grid-loading-overlay.component.scss',
})
export class GridLoadingOverlayComponent implements ILoadingOverlayAngularComp {
  agInit(_params: ILoadingOverlayParams): void {}
}
