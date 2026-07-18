import { GridOptions } from 'ag-grid-community';
import { DEFAULT_COLUMN } from './default-column';

export const DEFAULT_GRID_OPTIONS: GridOptions = {
  rowModelType: 'clientSide',
  animateRows: true,
  pagination: false,
  suppressCellFocus: true,
  defaultColDef: DEFAULT_COLUMN,
};
