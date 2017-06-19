"use strict";

/**
 * Localized days and months
 */
const localizationData = {
    en: {
        days: [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
        daysShort: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
        months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
        monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
    },
    de: {
        days: [ "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag" ],
        daysShort: [ "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So" ],
        months: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ],
        monthsShort: [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ]
    }
};

/**
 * Formats a Date object with a formatter string
 * Mostly matches the behaviour of PHPs date()
 * @see {@link http://php.net/manual/en/function.date.php|PHP date() docs}
 * 
 * @param {string} formatterString - The formatter string
 * @param {Date} [date=new Date] - The date to format
 * @param {string} [locale=en] - The localization code
 * 
 * @returns {string} - The formatted date string
 * 
 * To extend the native Date object (this is not recommended, think well before you do so!) add this after the definition:
 * Date.prototype.format = function(formatterString, locale = 'en') { return formatDate(formatterString, this, locale); }
 */
const formatDateBase = function formatDateBase ({
    formatterString,
    utc = false,
    date = new Date,
    locale = 'en'
}) {
    // Determine localization data
    if (typeof localizationData[locale] !== 'object')
        throw `No language data for "${locale}"`;

    const localizedData = localizationData[locale];
    
    const get = (date, what) => date[`get${ utc ? 'UTC' : '' }${what}`]()

    // Determine some helper data
    const trueModulo = (a, b) => (+a % (b = +b) + b) % b
    const day = get(date, 'Date')
    const weekday = get(date, 'Day')
    const normalizedWeekday = trueModulo(weekday - 1, 7)
    const month = get(date, 'Month') + 1
    const year = get(date, 'FullYear')
    const hours = get(date, 'Hours')
    const minutes = get(date, 'Minutes')
    const seconds = get(date, 'Seconds')
    const time = date.getTime()
    const timezone = date.getTimezoneOffset()
    const leading = str => String(str).length === 1 ? "0" + str : str
    const calcISOWeek = () => {
        // Kudos to Stackoverflow: http://stackoverflow.com/a/6117889/2048874
        const d = new Date(+date);
        d.setHours(0, 0, 0);
        d.setDate(get(d, 'Date') + 4 - (get(d, 'Day') || 7));

        const year = new Date(get(d, 'FullYear'), 0, 1);
        const week = Math.ceil((( (d - year) / 86400000) + 1)/7);

        return {
            year: get(year, 'FullYear'),
            week: week
        }
    }

    // The patterns to make available
    const patterns = {
        d: () => leading(day),
        D: () => localizedData.daysShort[normalizedWeekday],
        j: () => day,
        l: () => localizedData.days[normalizedWeekday],
        N: () => normalizedWeekday + 1,
        S: () => {
            var j = day % 10,
                k = day % 100;
            if (j == 1 && k != 11) {
                return 'st';
            }
            if (j == 2 && k != 12) {
                return 'nd';
            }
            if (j == 3 && k != 13) {
                return 'rd';
            }
            return 'th';
        },
        w: () => weekday,
        z: () => Math.floor((time - new Date(year, 0, 1).getTime()) / 86400000),
        W: () => calcISOWeek().week,
        F: () => localizedData.months[month - 1],
        m: () => leading(month),
        M: () => localizedData.monthsShort[month - 1],
        n: () => month,
        t: () => (new Date(year, month, 0)).getDate(),
        L: () => ((new Date(year + 1, 0, 1).getTime() - new Date(year, 0, 1).getTime()) / 86400000) === 366,
        o: () => calcISOWeek().year,
        Y: () => year,
        y: () => String(year).substr(2),
        a: () => hours <= 12 ? "am" : "pm",
        A: () => hours <= 12 ? "AM" : "PM",
        g: () => trueModulo((hours - 1), 12) + 1,
        G: () => hours,
        h: () => leading(trueModulo((hours - 1), 12) + 1),
        H: () => leading(hours),
        i: () => leading(minutes),
        s: () => leading(seconds),
        u: () => date.getTime(),
        I: () => timezone < Math.max(new Date(year, 0, 1).getTimezoneOffset(), new Date(year, 6, 1).getTimezoneOffset()) ? "1" : "0",
        O: () => {
            const offset = timezone / -60;
            return (offset < 0 ? "-" : "+") + leading(offset) + "00";
        },
        P: () => {
            const offset = timezone / -60;
            return (offset < 0 ? "-" : "+") + leading(offset) + ":00"
        },
        Z: () => timezone * 60,
        c: function() { return `${this.Y()}-${this.m()}-${this.d()}T${this.H()}:${this.i()}:${this.s()}${this.P()}` },
        r: function() { return `${localizationData.en.daysShort[normalizedWeekday]}, ${this.j()} ${this.M()} ${this.Y()} ${this.H()}:${this.i()}:${this.s()} ${this.P()}` },
        U: () => Math.round(time / 1000),
    };
    
    // Return the formatter string with replaced entities
    return formatterString.replace(
        new RegExp('(' + Object.keys(patterns).join('|') + ')', 'g'),
        match => patterns[match]()
    );
};

const supplementArgs = function supplementArgs (args) {
    let date, locale

    // Use defaults for `date` and `locale`
    switch (args.length) {
        case 0:
            date = new Date
            locale = 'en'
            break;

        case 1:
            if (typeof args[0] === 'string') {
                locale = args[0]
                date = new Date
            } else {
                locale = 'en'
                date = args[0]
            }
            break;

        case 2:
            date = args[0]
            locale = args[1]
            break;
    }

    return { date, locale }
}

const formatDate = function formatDate (formatterString) {
    const { date, locale } = supplementArgs(Array.prototype.slice.call(arguments, 1))

    return formatDateBase({
        formatterString,
        locale,
        date,
        utc: false
    })
}

formatDate.UTC = function formatDateUTC (formatterString) {
    const { date, locale } = supplementArgs(Array.prototype.slice.call(arguments, 1))

    return formatDateBase({
        formatterString,
        locale,
        date,
        utc: true
    })
}

/**
 * Append localization data to the function object
 */
formatDate.localizationData = localizationData;

module.exports = formatDate;