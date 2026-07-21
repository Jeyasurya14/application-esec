import {
  ColDef,
  ICellRendererParams,
  ValueFormatterParams,
  ValueGetterParams,
} from 'ag-grid-community';
import { GridColumn } from '../../../framework/grid';

type LicenseGridRow = Record<string, unknown> & {
  l_qty_i?: unknown;
};

function toNumber(value: unknown): number {
  if (value === null || value === undefined || value === '') return 0;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function formatNumber(value: unknown, maximumFractionDigits = 4): string {
  const numericValue = toNumber(value);
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits,
  }).format(numericValue);
}

function getUsagePercent(row: LicenseGridRow | undefined, quantityField: string): number {
  const quantity = toNumber(row?.[quantityField]);
  const issued = toNumber(row?.l_qty_i);
  if (!issued) return 0;
  return (quantity / issued) * 100;
}

function percentCellRenderer(params: ICellRendererParams): HTMLElement {
  const wrapper = document.createElement('span');
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'center';
  wrapper.style.justifyContent = 'flex-end';
  wrapper.style.gap = '6px';
  wrapper.style.width = '100%';
  wrapper.style.boxSizing = 'border-box';

  const dot = document.createElement('span');
  dot.style.width = '10px';
  dot.style.height = '10px';
  dot.style.borderRadius = '50%';
  dot.style.backgroundColor = '#68d478';
  dot.style.flex = '0 0 auto';

  const value = document.createElement('span');
  value.style.minWidth = '32px';
  value.style.textAlign = 'right';
  value.textContent = formatNumber(params.value, 1);

  wrapper.append(dot, value);
  return wrapper;
}

function fixedColumn(def: ColDef): ColDef {
  return {
    flex: 0,
    resizable: true,
    suppressSizeToFit: true,
    ...def,
  };
}

function serialNumberColumn(): ColDef {
  return fixedColumn({
    colId: 's_no',
    headerName: 'S No',
    width: 68,
    minWidth: 68,
    maxWidth: 76,
    pinned: 'left',
    lockPinned: true,
    type: 'numericColumn',
    valueGetter: (params: ValueGetterParams) => (params.node?.rowIndex ?? 0) + 1,
  });
}

function textColumn(field: string, headerName: string, width: number, pinned = false): ColDef {
  return fixedColumn({
    field,
    headerName,
    width,
    minWidth: Math.min(width, 120),
    maxWidth: Math.max(width + 80, width),
    pinned: pinned ? 'left' : undefined,
    tooltipField: field,
  });
}

function valueColumn(field: string, headerName: string, width = 76): ColDef {
  return fixedColumn({
    field,
    headerName,
    width,
    minWidth: width,
    maxWidth: width + 24,
    type: 'numericColumn',
    valueFormatter: (params: ValueFormatterParams) => formatNumber(params.value),
  });
}

export function licensePercentColumn(quantityField: string): ColDef {
  return fixedColumn({
    colId: `${quantityField}_percent`,
    headerName: '%',
    width: 76,
    minWidth: 76,
    maxWidth: 86,
    type: 'numericColumn',
    valueGetter: (params: ValueGetterParams<LicenseGridRow>) =>
      getUsagePercent(params.data, quantityField),
    valueFormatter: (params: ValueFormatterParams) => formatNumber(params.value, 1),
    cellRenderer: percentCellRenderer,
  });
}

export function licenseQuantityPercentGroup(headerName: string, quantityField: string): GridColumn {
  return {
    headerName,
    marryChildren: true,
    children: [valueColumn(quantityField, 'Qty', 74), licensePercentColumn(quantityField)],
  };
}

export function departmentLicenseColumns(): readonly GridColumn[] {
  return [
    serialNumberColumn(),
    textColumn('sw', 'Software', 150, true),
    textColumn('server', 'Server', 150, true),
    textColumn('lic_name', 'Feature', 220, true),
    textColumn('divn', 'Division', 110),
    textColumn('dept', 'Department', 150),
    {
      headerName: 'Issued',
      marryChildren: true,
      children: [valueColumn('l_qty_i', 'Last', 86)],
    },
    valueColumn('qty_db', 'Borrow', 82),
    licenseQuantityPercentGroup('Work Peak', 'qty_dp'),
    licenseQuantityPercentGroup('Work Avg', 'qty_da'),
    licenseQuantityPercentGroup('Work Peak Mean', 'qty_dpm'),
    licenseQuantityPercentGroup('Work Avg Mean', 'qty_dam'),
    valueColumn('tot_du_q', 'License Hours Used', 112),
    valueColumn('di', 'User', 82),
    valueColumn('de', 'True Denial', 92),
    {
      headerName: 'Days',
      marryChildren: true,
      children: [valueColumn('days', 'Usage', 86)],
    },
    textColumn('expiry', 'Expiry', 112),
    textColumn('last_date', 'Collected Date', 136),
    textColumn('status', 'Status', 104),
  ];
}


export function organizationLicenseColumns(): readonly GridColumn[] {
  return [
    serialNumberColumn(),
    textColumn('sw', 'Software', 150, true),
    textColumn('server', 'Server', 150, true),
    textColumn('lic_name', 'Feature', 220, true),
    {
      headerName: 'Issued',
      marryChildren: true,
      children: [valueColumn('l_qty_i', 'Last', 86)],
    },
    valueColumn('qty_db', 'Borrow', 82),
    licenseQuantityPercentGroup('Work Peak', 'qty_dp'),
    licenseQuantityPercentGroup('Work Avg', 'qty_da'),
    licenseQuantityPercentGroup('Work Peak Mean', 'qty_dpm'),
    licenseQuantityPercentGroup('Work Avg Mean', 'qty_dam'),
    valueColumn('tot_du_q', 'License Hours Used', 112),
    valueColumn('di', 'User', 82),
    valueColumn('de', 'True Denial', 92),
    {
      headerName: 'Days',
      marryChildren: true,
      children: [valueColumn('days', 'Usage', 86)],
    },
    textColumn('expiry', 'Expiry', 112),
    textColumn('last_date', 'Collected Date', 136),
    textColumn('status', 'Status', 104),
  ];
}


export function divisionLicenseColumns(): readonly GridColumn[] {
  return [
    serialNumberColumn(),
    textColumn('sw', 'Software', 150, true),
    textColumn('server', 'Server', 150, true),
    textColumn('lic_name', 'Feature', 220, true),
    textColumn('divn', 'Division', 110),
    {
      headerName: 'Issued',
      marryChildren: true,
      children: [valueColumn('l_qty_i', 'Last', 86)],
    },
    valueColumn('qty_db', 'Borrow', 82),
    licenseQuantityPercentGroup('Work Peak', 'qty_dp'),
    licenseQuantityPercentGroup('Work Avg', 'qty_da'),
    licenseQuantityPercentGroup('Work Peak Mean', 'qty_dpm'),
    licenseQuantityPercentGroup('Work Avg Mean', 'qty_dam'),
    valueColumn('tot_du_q', 'License Hours Used', 112),
    valueColumn('di', 'User', 82),
    valueColumn('de', 'True Denial', 92),
    {
      headerName: 'Days',
      marryChildren: true,
      children: [valueColumn('days', 'Usage', 86)],
    },
    textColumn('expiry', 'Expiry', 112),
    textColumn('last_date', 'Collected Date', 136),
    textColumn('status', 'Status', 104),
  ];
}
