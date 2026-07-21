import { PeriodPreset, DateRange } from "../models/period.model";

const FISCAL_START_MONTH = 3;

function startOfDay(d: Date): Date{
    const r = new Date(d);
    r.setHours(0,0,0,0);
    return r
}

function endOfDay(d:Date): Date{
    const r = new Date(d);
    r.setHours(23,59,59,999)
    return r
}

export function resolveRange(preset:PeriodPreset, today:Date = new Date()): DateRange{
    const todayStart = startOfDay(today)
    const todayEnd = endOfDay(today)

    switch(preset.kind){
        case'rolling-days': {
            // const start = new Date(todayStart);
            // start.setDate(start.getDate() - (preset.days! - 1))
            // return{start, end: todayEnd}
            const month = Math.floor(preset.days! / 30)
            const start = new Date(today.getFullYear(), today.getMonth() - month, 1)
            const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
            return{start: startOfDay(start), end: endOfDay(end)}
        }
        case 'week':{
            const start = new Date(todayStart);
            const dow = start.getDay()
            start.setDate(start.getDate() - dow )

            const end = new Date(start);
            end.setDate(end.getDate() + 6)
            return{start:startOfDay(start), end:endOfDay(end)}
        }
        case 'ytd':{
            const year = today.getMonth() >= FISCAL_START_MONTH ? today.getFullYear() : today.getFullYear() - 1;

            const start = new Date(year, FISCAL_START_MONTH, 1)
            return{start: startOfDay(start), end:todayEnd}
        }

        case 'quarter':{
            const startMonth = (preset.quarter! - 1) * 3;
            const start = new Date(preset.year!, startMonth, 1)
            const end = new Date(preset.year!, startMonth + 3, 0)
            return{start: startOfDay(start), end: endOfDay(end)}
        }
        case 'year':{
            const start = new Date(preset.year!, 0, 1);
            const end = new Date(preset.year!, 11,31)
            return{start: startOfDay(start), end: endOfDay(end)}
        }
        case 'custom':
        default:
            return{start: todayStart, end: todayEnd}
    
    }
}