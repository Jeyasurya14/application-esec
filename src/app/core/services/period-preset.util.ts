import { PeriodPreset } from "../models/period.model";

export function getQuarterPresets(today: Date = new Date()): PeriodPreset[]{
    const preset : PeriodPreset[] = [];
    let year = today.getFullYear()

    let quarter = Math.floor(today.getMonth() / 3) + 1

    for(let i = 0; i<4; i++){
        preset.unshift({
            id:`Q${quarter}-${year}`,
            label:`Q${quarter}-${year}`,
            kind:'quarter',
            quarter,
            year
        })

        quarter--;
        if(quarter === 0){
            quarter = 4;
            year--;
        }
    }

    return preset;
}

export function getYearPresets(today: Date = new Date()): PeriodPreset[]{
    const currentYear = today.getFullYear();

    return[
        { id:`${currentYear - 1}`,
          label:`${currentYear -1}`,
          kind:'year',
          year: currentYear-1
        },
        {
            id:`${currentYear}`,
            label:`${currentYear}`,
            kind:'year',
            year:currentYear
        }
        ]
}

export function getRollingDayPresets(): PeriodPreset[]{
    return[
        {id:'30Days',
            label:'30 Days',
            kind:'rolling-days',
            days:30
        },
        {
            id:'60Days',
            label:'60 Days',
            kind:'rolling-days',
            days:60
        },
        {
            id:'90Days',
            label:'90 Days',
            kind:'rolling-days',
            days:90
        },
        {
            id:'180Days',
            label:'180 Days',
            kind:'rolling-days',
            days:180
        },
        {
            id:'360Days',
            label:'360 Days',
            kind:'rolling-days',
            days:360
        }
    ]
}

export function getPeriodPresets(): PeriodPreset[]{
    return[
        {
            id:'today',
            label:'Today',
            kind:'rolling-days',
            days:1
        },
        {
            id:'week',
            label:'This Week',
            kind:'week'
        },
        ...getRollingDayPresets(),
        {
            id:'ytd',
            label:'YTD',
            kind:'ytd'
        },
        ...getQuarterPresets(),
        ...getYearPresets(),

    ]
}