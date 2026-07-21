import { GridContext } from '../../../../framework/grid';
import { departmentFilterConfig } from './department.filters';
import { DepartmentDataSource } from './department.ds';
import { Department } from './department.models';
import { departmentLicenseColumns } from '../license-grid-columns';

export const departmentContext: GridContext<Department> = {
  tabId: 'license.department',
  title: 'Department',
  datasource: DepartmentDataSource,
  columns: departmentLicenseColumns(),
  fitColumns: false,
  filterConfig: departmentFilterConfig,
};
