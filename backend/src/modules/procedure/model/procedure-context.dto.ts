export interface ProcedureContext{
    module:string;
    screen:string;
    user:string;
    range:string;
    startDate?:string;
    endDate?:string;
    startTime?:string;
    endTime?:string
}