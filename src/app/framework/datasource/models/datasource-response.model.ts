export interface DataSourceResponse<T>{
    rows: readonly T[];
    totalRows: number;
}