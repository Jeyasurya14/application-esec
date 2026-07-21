import { GridContext } from '../../../../framework/grid';
import { gridColumns } from '../../../../framework/columns';
import { MyFeatureDataSource } from './my-feature.ds';
import { MyFeature } from './my-feature.model';
import { myFeatureFilterConfig } from './my-feature.filters';

export const myFeatureContext: GridContext<MyFeature> = {
  tabId: 'license.my-feature',
  title: 'My Feature',
  datasource: MyFeatureDataSource,
  columns: gridColumns(
    'sw',
    'server',
    'location',
    'lic',
    'lic_name',
    'g_type',
    'g_name',
    'g_member',
    'start_date',
    's_time',
    'u_flag',
    'user_id',
    'wksn',
    'last_date',
    'u_time',
  ),
  filterConfig: myFeatureFilterConfig,
};
