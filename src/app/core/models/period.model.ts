export type PeriodKind = | 'rolling-days' | 'week' | 'ytd' | 'quarter' | 'year' | 'custom';
//  '30Days' | '60Days' | '90Days' | '180Days' | '360Days' |
export interface PeriodPreset{
    id: string;
    label: string;
    kind: PeriodKind;
    days?:number;
    month?:number;
    quarter?:number;
    year?:number;
}

export interface DateRange{
    start: Date;
    end: Date;
}