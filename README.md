# php-date

[![Build Status](https://travis-ci.org/Loilo/node-sass-yaml-importer.svg?branch=master)](https://travis-ci.org/Loilo/node-sass-yaml-importer)

This package aims to mimic the formatting of [PHP's date](http://php.net/manual/en/function.date.php) function in JavaScript.

## Installation
Install via npm:

```bash
npm install --save php-date
```

## Usage
The signature looks like this:

```javascript
{string} date ( formatterString [, date = new Date [, locale = "en" ]] )
```

So just use it mostly like in PHP:

```javascript
const date = require('php-date')

const releaseDate = new Date(2016, 9, 18)

date('d.m.Y', releaseDate) // 18.10.2016
date('F jS Y', releaseDate) // October 18th 2016
```

Sometimes you want to format a given date for the UTC timezone. You can do so by using the `date.UTC` function, it has the same signature as the `date` function itself:

```javascript
date.UTC(...)
```

The second argument is completely optional, like in PHP this will default to the current point in time.

You may also pass a `locale` parameter which has influence on the output of day and month names:

```javascript
date('l', releaseDate, 'de') // Dienstag
```

If you want to use the current date you can just omit the `date` parameter.

## Language data
The locale defaults to `en`. English and German names are pre-included in the package but you can easily add your own. This would add German to the formatter if it wasn't already in there:

```javascript
date.localizationData.de = {
  days: [ "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag" ],
  daysShort: [ "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So" ],
  months: [ "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember" ],
  monthsShort: [ "Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ]
}
```

## Timezone identifiers
The only PHP date token not supported by this package are timezones (tokens `e` and `T`) which would return a timezone identifier. I felt like that would bloat the code a little too much. Also I'm not even sure if that's reliably detectable.
