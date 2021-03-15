'use strict'

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]
const daysShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const monthsShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

/**
 * Formats a Date object with a formatter string
 * Mostly matches the behaviour of PHPs date()
 * @see {@link http://php.net/manual/en/function.date.php|PHP date() docs}
 *
 * @param {string} formatterString The formatter string
 * @param {Date}   date            The date to format
 *
 * @returns {string} The formatted date string
 *
 * To extend the native Date object (this is not recommended, think well before you do so!) add this after the definition:
 * Date.prototype.format = function(formatterString) { return formatDate(formatterString, this); }
 */
function formatDateBase(formatterString, date, utc) {
  const set = (date, what, ...args) =>
    date[`set${utc ? 'UTC' : ''}${what}`](...args)
  const get = (date, what) => date[`get${utc ? 'UTC' : ''}${what}`]()

  // Determine some helper data
  const trueModulo = (a, b) => ((+a % (b = +b)) + b) % b
  const day = get(date, 'Date')
  const weekday = get(date, 'Day')
  const normalizedWeekday = trueModulo(weekday - 1, 7)
  const month = get(date, 'Month') + 1
  const year = get(date, 'FullYear')
  const hours = get(date, 'Hours')
  const minutes = get(date, 'Minutes')
  const seconds = get(date, 'Seconds')
  const milliseconds = get(date, 'Milliseconds')
  const time = date.getTime()
  const timezone = utc ? 0 : date.getTimezoneOffset()
  const leading = str => (String(str).length === 1 ? '0' + str : str)
  const calcISOWeek = () => {
    // Kudos to Stackoverflow: http://stackoverflow.com/a/6117889/2048874
    const d = new Date(+date)
    set(d, 'Hours', 0, 0, 0)
    set(d, 'Date', get(d, 'Date') + 4 - (get(d, 'Day') || 7))

    let dateArgs = [get(d, 'FullYear'), 0, 1]
    if (utc) {
      dateArgs = [Date.UTC(...dateArgs)]
    }

    const year = new Date(...dateArgs)
    const week = Math.ceil(((d - year) / 86400000 + 1) / 7)

    return {
      year: get(year, 'FullYear'),
      week: week
    }
  }

  // The patterns to make available
  const patterns = {
    B: () => {
      return String(
        Math.floor(
          ((date.getUTCSeconds() / 3600 +
            date.getUTCMinutes() / 60 +
            ((date.getUTCHours() + 1) % 24)) *
            1000) /
            24
        )
      )
    },
    d: () => leading(day),
    D: () => daysShort[normalizedWeekday],
    j: () => day,
    l: () => days[normalizedWeekday],
    N: () => normalizedWeekday + 1,
    S: () => {
      var j = day % 10,
        k = day % 100
      if (j == 1 && k != 11) {
        return 'st'
      }
      if (j == 2 && k != 12) {
        return 'nd'
      }
      if (j == 3 && k != 13) {
        return 'rd'
      }
      return 'th'
    },
    v: () => {
      const msString = String(milliseconds)
      return '0'.repeat(3 - msString.length) + msString
    },
    w: () => weekday,
    z: () => Math.floor((time - new Date(year, 0, 1).getTime()) / 86400000),
    W: () => calcISOWeek().week,
    F: () => months[month - 1],
    m: () => leading(month),
    M: () => monthsShort[month - 1],
    n: () => month,
    t: () => new Date(year, month, 0).getDate(),
    L: () => {
      const checkDate = new Date(date.getTime())
      checkDate.setMonth(1)
      checkDate.setDate(29)
      return checkDate.getDate() === 29 ? '1' : '0'
    },
    o: () => calcISOWeek().year,
    Y: () => year,
    y: () => String(year).substr(2),
    a: () => (hours <= 12 ? hours == 12 ? 'pm' : 'am' : 'pm'),
    A: () => (hours <= 12 ? hours == 12 ? 'PM' : 'AM' : 'PM'),
    g: () => trueModulo(hours - 1, 12) + 1,
    G: () => hours,
    h: () => leading(trueModulo(hours - 1, 12) + 1),
    H: () => leading(hours),
    i: () => leading(minutes),
    s: () => leading(seconds),
    u: () => '000000',
    I: () =>
      timezone <
      Math.max(
        new Date(year, 0, 1).getTimezoneOffset(),
        new Date(year, 6, 1).getTimezoneOffset()
      )
        ? '1'
        : '0',
    O: () => {
      const offset = timezone / -60
      return (offset < 0 ? '-' : '+') + leading(offset) + '00'
    },
    P: () => {
      const offset = timezone / -60
      return (offset < 0 ? '-' : '+') + leading(offset) + ':00'
    },
    Z: () => String(-(timezone * 60)),
    c: function() {
      return `${this.Y()}-${this.m()}-${this.d()}T${this.H()}:${this.i()}:${this.s()}${this.P()}`
    },
    r: function() {
      return `${
        daysShort[normalizedWeekday]
      }, ${this.j()} ${this.M()} ${this.Y()} ${this.H()}:${this.i()}:${this.s()} ${this.O()}`
    },
    U: () => Math.round(time / 1000)
  }

  // Return the formatter string with replaced entities
  return formatterString.replace(
    new RegExp('(' + Object.keys(patterns).join('|') + ')', 'g'),
    match => patterns[match]()
  )
}

const formatDate = function formatDate(formatterString, date = new Date()) {
  return formatDateBase(formatterString, date, false)
}

formatDate.UTC = function formatDateUTC(formatterString, date = new Date()) {
  return formatDateBase(formatterString, date, true)
}

module.exports = formatDate
