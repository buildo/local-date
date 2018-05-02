// @flow

import LocalDate from '../../src/LocalDate';

let lastLoggedWarning = null;
// $FlowIgnore
console.warn = (warning) => { // eslint-disable-line no-console
  lastLoggedWarning = warning;
};

describe('Getters', () => {

  const localDate = new LocalDate();

  it('toISOString should return an ISO date', () => {
    expect(localDate.toISOString()).toMatch(LocalDate.ISO_DATE_FORMAT);
    expect(() => new LocalDate(localDate.toISOString())).not.toThrow();
  });

  it('toJSON should return an ISO date', () => {
    expect(localDate.toJSON()).toMatch(LocalDate.ISO_DATE_FORMAT);
    expect(() => new LocalDate(localDate.toJSON())).not.toThrow();
  });

  it('getHours should log a warning and return value from Date.getHours', () => {
    expect(localDate.getHours()).toBe(0);
    expect(lastLoggedWarning).toBe('You shouldn\'t use LocalDate.getHours as LocalDate is time agnostic.');
  });

  it('getMinutes should log a warning and return value from Date.getMinutes', () => {
    expect(localDate.getMinutes()).toBe(0);
    expect(lastLoggedWarning).toBe('You shouldn\'t use LocalDate.getMinutes as LocalDate is time agnostic.');
  });

  it('getSeconds should log a warning and return value from Date.getSeconds', () => {
    expect(localDate.getSeconds()).toBe(0);
    expect(lastLoggedWarning).toBe('You shouldn\'t use LocalDate.getSeconds as LocalDate is time agnostic.');
  });

  it('getMilliseconds should log a warning and return value from Date.getMilliseconds', () => {
    expect(localDate.getMilliseconds()).toBe(0);
    expect(lastLoggedWarning).toBe('You shouldn\'t use LocalDate.getMilliseconds as LocalDate is time agnostic.');
  });

  it('"warn" should not log a warning if process.node.env is "production"', () => {
    const _NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    lastLoggedWarning = null;

    expect(localDate.getHours()).toBe(0);
    expect(lastLoggedWarning).toBe(null);

    expect(localDate.getMinutes()).toBe(0);
    expect(lastLoggedWarning).toBe(null);

    expect(localDate.getSeconds()).toBe(0);
    expect(lastLoggedWarning).toBe(null);

    expect(localDate.getMilliseconds()).toBe(0);
    expect(lastLoggedWarning).toBe(null);

    // restore NODE_ENV
    process.env.NODE_ENV = _NODE_ENV;
  });

});
