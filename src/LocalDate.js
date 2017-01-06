// @flow

function pad2(number: number): number | string {
  return number < 10  ? `0${number}` : number;
}

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message); // eslint-disable-line no-console
  }
}

export default class LocalDate extends Date {

  static ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/

  static test(isoDate: string) {
    return LocalDate.ISO_DATE_FORMAT.test(isoDate);
  }

  constructor(value: LocalDate | string | void) {
    if (typeof value === 'undefined') {
      const now = new Date();
      super(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (value instanceof LocalDate) {
      super(value.getFullYear(), value.getMonth(), value.getDate());
    } else if (typeof value === 'string' && LocalDate.ISO_DATE_FORMAT.test(value)) {
      const [
        year,
        month,
        date
      ] = LocalDate.ISO_DATE_FORMAT.exec(value).slice(1).map(s => parseInt(s, 10));
      super(year, month - 1, date, 0, 0, 0, 0);
    } else {
      throw new Error('Invalid date supplied. Please specify an ISO date string (YYYY-MM-DD) or a LocalDate object.\nhttps://github.com/buildo/local-date#parser'); // eslint-disable-line max-len
    }
  }

  toISOString(): string {
    return [this.getFullYear(), pad2(this.getMonth() + 1), pad2(this.getDate())].join('-');
  }

  getHours(): number {
    warn('You shouldn\'t use LocalDate.getHours as LocalDate is time agnostic.');
    return Date.prototype.getHours.call(this);
  }

  getMinutes(): number {
    warn('You shouldn\'t use LocalDate.getMinutes as LocalDate is time agnostic.');
    return Date.prototype.getMinutes.call(this);
  }

  getSeconds(): number {
    warn('You shouldn\'t use LocalDate.getSeconds as LocalDate is time agnostic.');
    return Date.prototype.getSeconds.call(this);
  }

  getMilliseconds(): number {
    warn('You shouldn\'t use LocalDate.getMilliseconds as LocalDate is time agnostic.');
    return Date.prototype.getMilliseconds.call(this);
  }

}
