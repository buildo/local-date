import LocalDate from '../../src';

function shouldNotConsiderTimeOrTimezone(localDate) {
  expect(localDate.getHours()).toEqual(0);
  expect(localDate.getMinutes()).toEqual(0);
  expect(localDate.getSeconds()).toEqual(0);
  expect(localDate.getMilliseconds()).toEqual(0);
}

describe('LocalDate', () => {

  it('Should be an instance of Date', () => {
    expect(new LocalDate() instanceof Date).toBe(true);
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

  it('Should parse JS Dates without considering any time or timezone', () => {
    const year = 1991;
    const month = 6;
    const day = 4;
    const jsDate = new Date(year, month - 1, day, 15, 30, 30);
    const localDate = new LocalDate(jsDate);

    expect(localDate.getFullYear()).toEqual(year);
    expect(localDate.getMonth()).toEqual(month - 1);
    expect(localDate.getDate()).toEqual(day);
    shouldNotConsiderTimeOrTimezone(localDate);
  });

  it('Should throw an error if argument is invalid', () => {
    const newLocalDate = argument => () => {
      return new LocalDate(argument);
    };

    expect(newLocalDate(null)).toThrow();
    expect(newLocalDate(1483549074687)).toThrow(); // timestamp
    expect(newLocalDate(2016, 5, 21)).toThrow();
    expect(newLocalDate('2016-05-21-T16:57:03')).toThrow();
    expect(newLocalDate('2016-05-21-T16:57:03.438Z')).toThrow();
  });

});
