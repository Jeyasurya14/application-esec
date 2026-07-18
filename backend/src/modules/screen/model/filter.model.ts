export interface Filter{
    id:string;
    label:string;
    type:
        | 'text'
        | 'select'
        | 'checkbox'
        | 'date'
        | 'time';
    datasource?:string;
    defaultValue?:unknown
}