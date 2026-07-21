import { GridContext } from '../../../framework/grid';
import { LicensePlaceholderDataSource, LicensePlaceholderRow } from './license-placeholder.ds';

export function createLicensePlaceholderContext(
  tabId: string,
  title: string,
): GridContext<LicensePlaceholderRow> {
  return {
    tabId,
    title,
    datasource: LicensePlaceholderDataSource,
    columns: [
      { field: 'report', headerName: 'Report', width: 220, minWidth: 220 },
      { field: 'status', headerName: 'Status', width: 180, minWidth: 180 },
    ],
  };
}
