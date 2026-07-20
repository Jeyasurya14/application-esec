import { FilterOption, FilterOptionGroup } from './filter-option.model';
import { FilterType } from './filter-type.model';
import { FilterType as FilterDefType } from './filter-definition-type.type';

export interface FilterControl<T = unknown> {
  id: string;
  type: FilterType;
  label?: string;
  placeholder?: string;
  value?: T;
  width?: number;
  disabled?: boolean;
  options?: readonly FilterOption[];
  groups?: readonly FilterOptionGroup[];
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  clearable?: boolean;
  param?: string;
  immediate?: boolean;
  filter?: {
    type: FilterDefType;
    field: string;
    fields?: string[];
    valueFieldMap?: Record<string, string>;
  };
}
