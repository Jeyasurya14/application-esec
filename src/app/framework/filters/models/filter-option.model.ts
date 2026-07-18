export interface FilterOption<T = unknown> {
  label: string;
  value: T;
}

export interface FilterOptionGroup<T = unknown> {
  label: string;
  options: readonly FilterOption<T>[];
}
