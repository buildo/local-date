import LocalDate from '../../src';

describe('Fake', () => {

  it('should pass', () => {
    expect(new LocalDate() instanceof Date).toBe(true);
  });

});
