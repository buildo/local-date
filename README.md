# LocalDate
Replacement of `Date` for dealing with dates independent of time or timezone.

## Why
To avoid some:

![](http://imgur.com/hj0uRMy.png)

And some:

![](http://imgur.com/Ku9gmWS.png)

#### More seriously
JavaScript `Date` is a representation of a point in time (`timestamp`). The question is: "a point in time **where**?".

The problem with `Date` is that it always applies the user's current timezone to any parsed ISO date.

This can be a serious issue when you're dealing with dates that should be completely agnostic of time like birthdates or expiration dates.

`LocalDate` replaces the parser of `Date` with a simpler and stricter one which will consider only the date part (and conceptually **adapt** the timezone to it instead of the opposite).

## Install
```
npm i --save local-date
```

## Usage
`LocalDate` extends `Date` so it reflects its API for most things.
The only parts that change are the parser and the formatter `toISOString`.

To help users check wether a string is a valid ISO date or not, `LocalDate` has also a static method `test`.

### Parser
There are three possible ways to instantiate a `LocalDate`:

1. ISO date
2. no argument
3. another `LocalDate` instance

#### 1) ISO date
This is the standard way to instantiate a `LocalDate`: by passing it an ISO date string.
An ISO date is formatted as `YYYY-MM-DD` and doesn't contain any timezone.

```js
const localDate = new LocalDate('2016-05-20');

localDate.getFullYear(); // -> 2016 (timezone independent!)
localDate.getMonth(); // -> 4 (timezone independent!)
localDate.getDate(); // -> 20 (timezone independent!)
```

#### 2) no argument
`new LocalDate()` will return a `LocalDate` containing the current date for the user's timezone (internally it uses `new Date()`)

#### 3) another `LocalDate` instance
This method is useful if you need to clone an instance of `LocalDate`:

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
To check if a string is a valid ISO date or not, you can use the static method `LocalDate.test`:

```js
LocalDate.test('2016-05-20'); // -> true
LocalDate.test('2016-05-20T00:00:00.000Z'); // -> false
```
