import { FilterState } from "../../filters";
import { FilterDefinition } from "../../filters/models/filter-definition.model";
import { DataSourceColumn } from "./datasource-column.model";
import { Page } from "./page.model";
import { Sort } from "./sort.model";

export interface DataSourceRequest{
    filters:FilterState;
    sorts: readonly Sort[];
    page:Page;
}