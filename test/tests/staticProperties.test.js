import LocalDate from '../../src/LocalDate';

describe('Static properties', () => {

  it('ISO_DATE_FORMAT should be a valid RegExp', () => {
    expect(LocalDate.ISO_DATE_FORMAT instanceof RegExp).toBe(true);
  });

  it('match should return "true" if argument is valid ISO date', () => {
    expect(LocalDate.match('2016-05-20')).toBe(true);
  });

  it('match should return "false" if argument is not a valid ISO date', () => {
    expect(LocalDate.match('2017/01/04')).toBe(false);
    expect(LocalDate.match('05-20-2017')).toBe(false);
    expect(LocalDate.match('2017-01-04T18:04:52Z')).toBe(false);
    expect(LocalDate.match('2017-01-04T18:04:52.438Z')).toBe(false);
    expect(LocalDate.match('2017-01-04T18:04:52+00:00')).toBe(false);
  });

});
