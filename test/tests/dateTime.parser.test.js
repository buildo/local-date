import LocalDateTime from '../../src/LocalDateTime';

console.warn = () => {}; // eslint-disable-line no-console

describe('Parser', () => {

  it('Should be an instance of Date', () => {
    expect(new LocalDateTime() instanceof Date).toBe(true);
  });

  it('Should be an instance of LocalDateTime', () => {
    expect(new LocalDateTime() instanceof LocalDateTime).toBe(true);
  });

  it('Should return a LocalDateTime with current date time if no argument is passed and should not consider the timezone', () => {
    const today = new Date();
    const todayLocalDateTime = new LocalDateTime();

    expect(today.getFullYear()).toEqual(todayLocalDateTime.getFullYear());
    expect(today.getMonth()).toEqual(todayLocalDateTime.getMonth());
    expect(today.getDate()).toEqual(todayLocalDateTime.getDate());
    expect(today.getHours()).toEqual(todayLocalDateTime.getHours());
    expect(today.getMinutes()).toEqual(todayLocalDateTime.getMinutes());
    expect(today.getSeconds()).toEqual(todayLocalDateTime.getSeconds());
    expect(today.getMilliseconds()).toEqual(todayLocalDateTime.getMilliseconds());
  });

  it('Should parse ISO date times without considering the timezone', () => {
    const year = 1991;
    const month = 6;
    const day = 4;
    const hours = 10;
    const minutes = 10;
    const seconds = 42;
    const milliseconds = 210;
    const isoDate = `${year}-0${month}-0${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    const localDateTime = new LocalDateTime(isoDate);

    expect(localDateTime.getFullYear()).toEqual(year);
    expect(localDateTime.getMonth()).toEqual(month - 1);
    expect(localDateTime.getDate()).toEqual(day);
    expect(localDateTime.getHours()).toEqual(hours);
    expect(localDateTime.getMinutes()).toEqual(minutes);
    expect(localDateTime.getSeconds()).toEqual(seconds);
    expect(localDateTime.getMilliseconds()).toEqual(milliseconds);
  });

  it('Should clone instances of LocalDateTimes', () => {
    const localDateTime = new LocalDateTime('2016-05-20T10:10:42');
    const clonedLocalDateTime = new LocalDateTime(localDateTime);

    expect(localDateTime).toEqual(clonedLocalDateTime);
  });

  it('Should throw an error if argument is invalid', () => {
    const newLocalDateTime = argument => () => {
      return new LocalDateTime(argument);
    };

    expect(newLocalDateTime(new Date())).toThrow();
    expect(newLocalDateTime(null)).toThrow();
    expect(newLocalDateTime(1483549074687)).toThrow(); // timestamp
    expect(newLocalDateTime(2016, 5, 21)).toThrow();
    expect(newLocalDateTime('2017-01-04T18:04:52Z')).toThrow();
    expect(newLocalDateTime('2017-01-04T18:04:52.438Z')).toThrow();
    expect(newLocalDateTime('2017-01-04T18:04:52+00:00')).toThrow();
  });

});
