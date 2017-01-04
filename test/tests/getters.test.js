import LocalDate, { ISO_DATE_FORMAT } from '../../src/LocalDate';

describe('Getters', () => {

  it('toISOString should return an ISO date', () => {
    const localDate = new LocalDate();

    expect(localDate.toISOString()).toMatch(ISO_DATE_FORMAT);
    expect(() => new LocalDate(localDate.toISOString())).not.toThrow();
  });

});
