import LocalDate from '../../src';

console.warn = () => {}; // eslint-disable-line no-console

function shouldNotConsiderTimeOrTimezone(localDate) {
  expect(localDate.getHours()).toEqual(0);
  expect(localDate.getMinutes()).toEqual(0);
  expect(localDate.getSeconds()).toEqual(0);
  expect(localDate.getMilliseconds()).toEqual(0);
}

describe('Parser', () => {

  it('Should be an instance of Date', () => {
    expect(new LocalDate() instanceof Date).toBe(true);
  });

  it('Should be an instance of LocalDate', () => {
    expect(new LocalDate() instanceof LocalDate).toBe(true);
  });

  it('Should return a LocalDate with current date if no argument is passed and should not consider any time or timezone', () => {
    const today = new Date();
    const todayLocalDate = new LocalDate();

    expect(today.getFullYear()).toEqual(todayLocalDate.getFullYear());
    expect(today.getMonth()).toEqual(todayLocalDate.getMonth());
    expect(today.getDate()).toEqual(todayLocalDate.getDate());
    shouldNotConsiderTimeOrTimezone(todayLocalDate);
  });

  it('Should parse ISO dates without considering any time or timezone', () => {
    const year = 1991;
    const month = 6;
    const day = 4;
    const isoDate = `${year}-0${month}-0${day}`;
    const localDate = new LocalDate(isoDate);

    expect(localDate.getFullYear()).toEqual(year);
    expect(localDate.getMonth()).toEqual(month - 1);
    expect(localDate.getDate()).toEqual(day);
    shouldNotConsiderTimeOrTimezone(localDate);
  });

  it('Should clone instances of LocalDates', () => {
    const localDate = new LocalDate('2016-05-20');
    const clonedLocalDate = new LocalDate(localDate);

    expect(localDate).toEqual(clonedLocalDate);
  });

  it('Should throw an error if argument is invalid', () => {
    const newLocalDate = argument => () => {
      return new LocalDate(argument);
    };

    expect(newLocalDate(new Date())).toThrow();
    expect(newLocalDate(null)).toThrow();
    expect(newLocalDate(1483549074687)).toThrow(); // timestamp
    expect(newLocalDate(2016, 5, 21)).toThrow();
    expect(newLocalDate('2017-01-04T18:04:52Z')).toThrow();
    expect(newLocalDate('2017-01-04T18:04:52.438Z')).toThrow();
    expect(newLocalDate('2017-01-04T18:04:52+00:00')).toThrow();
  });

});
