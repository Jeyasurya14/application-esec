import { Type } from '@angular/core';
import { DataSource } from '../../datasource/datasource';
import { FrameworkGridOptions } from './grid-options.model';
import { GridColumn } from './grid-column.model';
import { GridTheme } from './grid-theme.type';
import { GridToolbar } from './grid-toolbar.model';
import { FilterConfig } from '../../filters/models/filter-config.model';
import { FilterState } from '../../filters/models/filter-state.model';
import { KpiCardsConfig } from '../../../shared/kpi-cards';

export interface InlineDataSourceConfig {
  procedure: string;
  columns: readonly string[];
  params?: readonly string[];
}

export type GridColumnFactory<T> = (
  rows: readonly T[],
  filters: FilterState,
) => readonly GridColumn[];

export interface GridContext<T> {
  tabId: string;
  title: string;
  columns: readonly GridColumn[];
  columnsFactory?: GridColumnFactory<T>;
  fitColumns?: boolean;
  datasource: Type<DataSource<T>>;
  inlineConfig?: InlineDataSourceConfig;
  toolbar?: GridToolbar;
  options?: FrameworkGridOptions;
  theme?: GridTheme;
  filterConfig?: FilterConfig;
  kpiConfig?: KpiCardsConfig;
  searchConfig?: {
    placeholder?: string;
    width?: number;
  };
}
