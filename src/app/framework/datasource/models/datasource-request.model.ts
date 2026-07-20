import { FilterConfig, FilterState } from '../../filters';
import { DataSourceColumn } from './datasource-column.model';
import { Page } from './page.model';
import { Sort } from './sort.model';

export interface DataSourceRequest {
  filters: FilterState;
  sorts: readonly Sort[];
  page: Page;
  filterConfig?: FilterConfig;
}
