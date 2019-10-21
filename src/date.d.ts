declare function formatDate (formatterString: string, date?: Date, locale?: string): string

declare namespace formatDate {
    function UTC (formatterString: string, date?: Date, locale?: string): string

    interface ILocalizationData {
        [lang: string]: {
            days: string[]
            daysShort: string[]
            months: string[]
            monthsShort: string[]
        }
    }

    var localizationData: ILocalizationData
}

export = formatDate