import { ColDef, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { GridColumn } from '../../../framework/grid';
import { FilterState } from '../../../framework/filters';

export const ORGANIZATION_WEEK_FILTER_ID = 'weekOptions';
export const ORGANIZATION_WEEK_DEFAULT_OPTIONS = [
  'working_days',
  'dp',
  'dp_percent',
  'di',
  'uh_percent',
];

export interface OrganizationWeekSourceRow {
  sw: string;
  server: string;
  lic: string;
  date: string;
  li_holi: string;
  qty_i: string;
  qty_dp: string;
  p_dp: string;
  di: string;
  used_lic_hours: string;
  avail_lic_hours: string;
  p_dw_q: string;
  [key: string]: unknown;
}

export interface OrganizationWeekPivotRow {
  sw: string;
  server: string;
  lic: string;
  __weekDates?: readonly string[];
  [key: string]: unknown;
}

interface WeekMetric {
  id: string;
  label: string;
  sourceField: keyof OrganizationWeekSourceRow;
  width: number;
  percent?: boolean;
}

const WEEK_METRICS: readonly WeekMetric[] = [
  { id: 'issued', label: 'I', sourceField: 'qty_i', width: 64 },
  { id: 'dp', label: 'DP', sourceField: 'qty_dp', width: 80 },
  { id: 'dp_percent', label: 'DP (%)', sourceField: 'p_dp', width: 80, percent: true },
  { id: 'di', label: 'DI', sourceField: 'di', width: 62 },
  { id: 'uh', label: 'UH', sourceField: 'used_lic_hours', width: 88 },
  { id: 'ah', label: 'AH', sourceField: 'avail_lic_hours', width: 88 },
  { id: 'uh_percent', label: 'UH (%)', sourceField: 'p_dw_q', width: 86, percent: true },
];

function toNumber(value: unknown): number {
  if (value === null || value === undefined || value === '') return 0;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function formatNumber(value: unknown): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(toNumber(value));
}

function formatDateLabel(value: unknown): string {
  const raw = String(value ?? '');
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return raw;

  const day = String(parsed.getDate()).padStart(2, '0');
  const month = parsed.toLocaleString('en-US', { month: 'short' });
  const year = parsed.getFullYear();
  return `${day}-${month}-${year}`;
}

function dateKey(dateLabel: string): string {
  return dateLabel.replace(/[^a-zA-Z0-9]/g, '_');
}

function metricField(dateLabel: string, metricId: string): string {
  return `week_${dateKey(dateLabel)}_${metricId}`;
}

function selectedWeekOptions(filters: FilterState): readonly string[] {
  const value = filters[ORGANIZATION_WEEK_FILTER_ID];
  return Array.isArray(value) ? value.map(String) : ORGANIZATION_WEEK_DEFAULT_OPTIONS;
}

function selectedMetrics(filters: FilterState): readonly WeekMetric[] {
  const selected = new Set(selectedWeekOptions(filters));
  return WEEK_METRICS.filter((metric) => selected.has(metric.id));
}

function percentCellRenderer(params: ICellRendererParams): HTMLElement {
  const valueNumber = toNumber(params.value);
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
  dot.style.backgroundColor =
    valueNumber >= 100 ? '#ff5d5d' : valueNumber >= 60 ? '#f8b62d' : '#68d478';
  dot.style.flex = '0 0 auto';

  const value = document.createElement('span');
  value.style.minWidth = '34px';
  value.style.textAlign = 'right';
  value.textContent = formatNumber(params.value);

  wrapper.append(dot, value);
  return wrapper;
}

function serialNumberColumn(): ColDef {
  return {
    colId: 's_no',
    headerName: 'S No',
    width: 72,
    minWidth: 72,
    type: 'numericColumn',
    valueGetter: (params) => (params.node?.rowIndex ?? 0) + 1,
    pinned: 'left',
  };
}

function textColumn(field: string, headerName: string, width: number): ColDef {
  return {
    field,
    headerName,
    width,
    minWidth: width,
    pinned: 'left',
  };
}

function metricColumn(dateLabel: string, metric: WeekMetric): ColDef {
  return {
    field: metricField(dateLabel, metric.id),
    headerName: metric.label,
    width: metric.width,
    minWidth: metric.width,
    type: 'numericColumn',
    valueFormatter: (params: ValueFormatterParams) => formatNumber(params.value),
    cellRenderer: metric.percent ? percentCellRenderer : undefined,
  };
}

export function isOrganizationWeekPrimary(filters: FilterState): boolean {
  return selectedWeekOptions(filters).includes('primary');
}

export function pivotOrganizationWeekRows(
  rows: readonly OrganizationWeekSourceRow[],
): readonly OrganizationWeekPivotRow[] {
  const dateLabels = Array.from(new Set(rows.map((row) => formatDateLabel(row.date))));
  const rowMap = new Map<string, OrganizationWeekPivotRow>();

  for (const source of rows) {
    const key = [source.sw, source.server, source.lic].join('\u001f');
    let target = rowMap.get(key);

    if (!target) {
      target = {
        sw: source.sw,
        server: source.server,
        lic: source.lic,
        __weekDates: dateLabels,
      };
      rowMap.set(key, target);
    }

    const label = formatDateLabel(source.date);
    for (const metric of WEEK_METRICS) {
      target[metricField(label, metric.id)] = source[metric.sourceField];
    }
  }

  return Array.from(rowMap.values());
}

export function organizationWeekColumns(
  rows: readonly OrganizationWeekPivotRow[],
  filters: FilterState,
): readonly GridColumn[] {
  const dates = rows[0]?.__weekDates ?? [];
  const metrics = selectedMetrics(filters);

  const dateGroups = metrics.length
    ? dates.map<GridColumn>((date) => ({
        headerName: date,
        marryChildren: true,
        children: metrics.map((metric) => metricColumn(date, metric)),
      }))
    : [];

  return [
    serialNumberColumn(),
    textColumn('sw', 'Software', 130),
    textColumn('server', 'Server', 150),
    textColumn('lic', 'License', 230),
    ...dateGroups,
  ];
}
