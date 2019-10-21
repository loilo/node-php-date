/**
 * Format a date with PHP-like tokens
 *
 * @param formatterString The format of the outputted date string
 * @param date            A Date object representing the time to be formatted, defaults to current time
 */
declare function formatDate(formatterString: string, date?: Date): string
declare namespace formatDate {
  /**
   * Format a date in the UTC timezone with PHP-like tokens
   *
   * @param formatterString The format of the outputted date string
   * @param date            A Date object representing the time to be formatted, defaults to current time
   */
  export function UTC(formatterString: string, date?: Date): string
}

export = formatDate
