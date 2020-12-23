# php-date

[![Tests](https://badgen.net/github/checks/loilo/node-php-date/master)](https://github.com/loilo/node-php-date/actions)
[![Version on npm](https://badgen.net/npm/v/php-date)](https://www.npmjs.com/package/php-date)

This package aims to mimic the formatting of [PHP's date](http://php.net/manual/en/function.date.php) function in JavaScript.

- [Almost all](#timezone-identifiers) tokens are supported
- Tiny (1.2KB minified & gzipped)
- Type annotations included
- Works in all modern browsers, IE11 and Node.js

## Installation

Install via npm:

```bash
npm install --save php-date
```

Or use in the browser via [unpkg](https://unpkg.com) (using the global `phpDate` variable):

```html
<script src="https://unpkg.com/php-date"></script>
```

## Usage

The signature looks like this:

```ts
date (formatter: string, date: Date = new Date): string
```

So just use it mostly like in PHP:

```js
const date = require('php-date')

const releaseDate = new Date(2016, 9, 18)

date('d.m.Y', releaseDate) // 18.10.2016
date('F jS Y', releaseDate) // October 18th 2016
```

Sometimes you want to format a given date for the UTC timezone. You can do so by using the `date.UTC` function, it has the same signature as the `date` function itself:

```js
date.UTC(...)
```

The second argument is completely optional; like in PHP this will default to the current point in time.

### Timezone Identifiers

The only PHP date tokens not supported by this package are timezones (tokens `e` and `T`) which would return timezone identifiers. I felt like that would bloat the code a little too much with the fallbacks necessary for older browsers.
