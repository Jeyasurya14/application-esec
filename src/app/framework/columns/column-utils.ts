import type { DataSourceColumn } from '../datasource/models';
import type { GridColumn } from '../grid';
import { COLUMN_REGISTRY } from './column-registry';

export function datasourceColumns(...fields: string[]): readonly DataSourceColumn[] {
  return fields.map((f) => ({ field: f }));
}

export function gridColumns(...fields: string[]): readonly GridColumn[] {
  return fields.map((f) => {
    const def = COLUMN_REGISTRY[f];
    if (!def) {
      console.warn(`[column-utils] Unknown field "${f}" — using raw field`);
      return { field: f, headerName: f, width: 100 };
    }
    return { ...def };
  });
}
