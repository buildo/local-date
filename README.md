# LocalDate
Replacement of `Date` for dealing with dates independent of timezone.

## Why
To avoid some:

![](http://imgur.com/hj0uRMy.png)

And some:

![](http://imgur.com/Ku9gmWS.png)

#### More seriously
JavaScript `Date` is a representation of a point in time (`timestamp`). The question is: "a point in time **where**?".

The problem with `Date` is that it always applies the user's current timezone to any parsed ISO date.

This can be a serious issue when you're dealing with dates that should be completely agnostic of time like birthdates or expiration dates.

```js
// GMT -05:00 (New York)
const date = new Date('1991-06-04');
date.getDate(); // -> 3 (Date always applies user's timezone!)
```

`LocalDate` and `LocalDateTime` replace the parser of `Date` with a simpler and stricter one which will consider only the date part (or the date + time parts), and conceptually **adapt** the timezone to it instead of the opposite.

```js
// GMT -05:00 (New York)
const localDate = new LocalDate('1991-06-04');
localDate.getDate(); // -> 4 (LocalDate always keeps the right year, month and day)

// Under the hood
new LocalDate('1991-06-04') == new Date(1991, 5, 4);
```

## Install
```
yarn add local-date
```

## Browser Support
`LocalDate` requires `Reflect` and `Array.from` from ES6.
If you need to support pre-es6 browsers (like IE), you can import the two polyfills directly from `local-date`:

```js
import 'local-date/lib/polyfills/reflect';
import 'local-date/lib/polyfills/array-from';
```

## Usage
`LocalDate` and `LocalDateTime` extend `Date` so they reflect its API for most things.
The only parts that change are the parser and the formatter `toISOString`.

To help users check wether a string is a valid ISO date or not, `LocalDate` and `LocalDateTime` have also a static method `test`.

### Parser
There are three possible ways to instantiate a `LocalDate` (`LocalDateTime`):

1. ISO date (datetime) string
2. no argument
3. another `LocalDate` (`LocalDateTime`) instance

#### 1) ISO date
This is the standard way to instantiate a `LocalDate`: by passing it an ISO date string.
An ISO date is formatted as `YYYY-MM-DD` and doesn't contain any timezone.

```js
const localDate = new LocalDate('2016-05-20');

localDate.getFullYear(); // -> 2016 (timezone independent!)
localDate.getMonth(); // -> 4 (timezone independent!)
localDate.getDate(); // -> 20 (timezone independent!)
```

Similarly, with a `LocalDateTime`:

```js
const localDateTime = new LocalDateTime('2016-05-20T10:10:42');
```

#### 2) no argument
`new LocalDate()` (`new LocalDateTime()`) will return a `LocalDate` (`LocalDateTime`) containing the current date for the user's timezone (internally it uses `new Date()`)

#### 3) another `LocalDate` (`LocalDateTime`) instance
This method is useful if you need to clone an instance of `LocalDate` (`LocalDateTime`):

```js
const localDate = new LocalDate('2016-05-20');
const clonedLocalDate = new LocalDate(localDate);

clonedLocalDate.getFullYear(); // -> 2016 (same as localDate!)
clonedLocalDate.getMonth(); // -> 4 (same as localDate!)
clonedLocalDate.getDate(); // -> 20 (same as localDate!)
```

### `toISOString`
`LocalDate` overwrites the default `toISOString` function in order to return an ISO date instead of an ISO date-time:

```js
const localDate = new LocalDate('2016-05-20');
const date = new Date('2016-05-20');

localDate.toISOString(); // -> "2016-05-20" (only the "date" and timezone independent!)
date.toISOString(); // -> ""2016-05-20T00:00:00.000Z"" (it contains the time as well and is therefore timezone dependent)
```

### `test`
To check if a string is a valid ISO date or not, you can use the static method `LocalDate.test` (`LocalDateTime.test`):

```js
LocalDate.test('2016-05-20'); // -> true
LocalDate.test('2016-05-20T00:00:00.000Z'); // -> false
LocalDateTime.test('2016-05-20T00:00:00'); // -> true
LocalDateTime.test('2016-05-20T00:00:00.000'); // -> true
LocalDateTime.test('2016-05-20T00:00:00.000Z'); // -> false
```
