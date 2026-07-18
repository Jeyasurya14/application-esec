import { Column } from "./column.model";
import { Filter } from "./filter.model";
import { Toolbar } from "./toolbar.model";

export interface Screen{
    id:string;
    module:string;
    title:string;
    procedure:string;
    toolbar:Toolbar;
    filters:Filter[];
    columns:Column[];
}