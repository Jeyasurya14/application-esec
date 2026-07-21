import { GridContext } from '../../../../framework/grid';
import { gridColumns } from '../../../../framework/columns';
import { ReportType1DataSource } from './report-type-1.ds';
import { ReportType1 } from './report-type-1.model';
import { reportType1FilterConfig } from './report-type-1.filters';


export const reportType1Context: GridContext<ReportType1> = {
  tabId: 'license.my-feature',
  title: 'My Feature',
  datasource: ReportType1DataSource,
  columns: gridColumns(
    'sw',
    'server',
    'lic',
    'lic_name',
  ),
  filterConfig: reportType1FilterConfig,
};
