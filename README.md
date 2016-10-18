# php-date

This package aims to mimick the formatting of [PHP's date](http://php.net/manual/en/function.date.php) function.

## Installation

`npm install php-date`

Please note that this module makes pretty heavy use of ES2015 so you should at least have Node.js v4.0.0 installed.

## Usage

The signature looks kind of like this:

`date(formatterString, [date = new Date,] [locale = "en"])`

So just use it mostly like in PHP:

```
const date = require('php-date')

const releaseDate = new Date(2016, 9, 18)

date('d.m.Y', releaseDate) // 18.10.2016
date('F jS Y', releaseDate) // October 18th 2016
```

The second argument is completely optional, like in PHP this will default to the current time.

You may also pass a `locale` parameter which has influence on the output of day and month names:

```
date('l', releaseDate, 'de') // Dienstag
```

If you want to use the current date you can just omit the `date` parameter.

## Language data

The locale defaults to `en`. English and German names are pre-included in the package but you can easily add your own. This would add German to the formatter if it wasn't already in there:

```
date.localizationData.de = {
  days: [ "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag" ],
  daysShort: [ "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So" ],
  months: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ],
  monthsShort: [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ]
}
```

## Timezone identifiers

The only token not supported by `php-date` is the `e` which gives a timezone identifier in PHP. I felt that this would bloat the code a little too much.