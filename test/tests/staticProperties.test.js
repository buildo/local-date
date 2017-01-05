import LocalDate from '../../src/LocalDate';

describe('Static properties', () => {

  it('ISO_DATE_FORMAT should be a valid RegExp', () => {
    expect(LocalDate.ISO_DATE_FORMAT instanceof RegExp).toBe(true);
  });

  it('test should return "true" if argument is a valid ISO date', () => {
    expect(LocalDate.test('2016-05-20')).toBe(true);
  });

  it('test should return "false" if argument is not a valid ISO date', () => {
    expect(LocalDate.test('2017/01/04')).toBe(false);
    expect(LocalDate.test('05-20-2017')).toBe(false);
    expect(LocalDate.test('2017-01-04T18:04:52Z')).toBe(false);
    expect(LocalDate.test('2017-01-04T18:04:52.438Z')).toBe(false);
    expect(LocalDate.test('2017-01-04T18:04:52+00:00')).toBe(false);
  });

});
