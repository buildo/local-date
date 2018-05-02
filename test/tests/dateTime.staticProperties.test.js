// @flow

import LocalDateTime from '../../src/LocalDateTime';

describe('Static properties', () => {

  it('ISO_DATE_TIME_FORMAT should be a valid RegExp', () => {
    expect(LocalDateTime.ISO_DATE_TIME_FORMAT instanceof RegExp).toBe(true);
  });

  it('test should return "true" if argument is a valid (local) ISO date time', () => {
    expect(LocalDateTime.test('2016-05-20T10:10:42')).toBe(true);
    expect(LocalDateTime.test('2016-05-20T10:10:42.234')).toBe(true);
  });

  it('test should return "false" if argument is not a valid (local) ISO date time', () => {
    expect(LocalDateTime.test('2017/01/04')).toBe(false);
    expect(LocalDateTime.test('05-20-2017')).toBe(false);
    expect(LocalDateTime.test('2017-01-04T18:04:52Z')).toBe(false);
    expect(LocalDateTime.test('2017-01-04T18:04:52.438Z')).toBe(false);
    expect(LocalDateTime.test('2017-01-04T18:04:52+00:00')).toBe(false);
  });

});
