// @flow

import LocalDateTime from '../../src/LocalDateTime';

describe('Getters', () => {

  const localDateTime = new LocalDateTime();

  it('toISOString should return an ISO date time', () => {
    expect(localDateTime.toISOString()).toMatch(LocalDateTime.ISO_DATE_TIME_FORMAT);
    expect(() => new LocalDateTime(localDateTime.toISOString())).not.toThrow();
  });

  it('toJSON should return an ISO date time', () => {
    expect(localDateTime.toJSON()).toMatch(LocalDateTime.ISO_DATE_TIME_FORMAT);
    expect(() => new LocalDateTime(localDateTime.toJSON())).not.toThrow();
  });

});
