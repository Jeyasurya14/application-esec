import { FilterType } from './filter-definition-type.type';

export interface FilterDefinition {
  id: string;
  field: string;
  fields?: string[];
  type: FilterType;
  ignoreEmpty?: boolean;
  valueFieldMap?: Record<string, string>;
}
