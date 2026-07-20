export interface SubTabDefinition {
  id: string;
  label: string;
  procedure: string;
  columns: readonly string[];
  params?: readonly string[];
  children?: readonly SubTabDefinition[];
  searchFields?: readonly string[];
}
