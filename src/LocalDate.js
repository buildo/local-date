export const ISO_DATE_FORMAT = /^(\d{4})-(\d{2})-(\d{2})$/;

function pad2(number) {
  return number < 10  ? `0${number}` : number;
}

function warn(message) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(message); // eslint-disable-line no-console
  }
}

export default class LocalDate extends Date {

  constructor(value = new Date()) {
    if (value instanceof Date) {
      super(value.getFullYear(), value.getMonth(), value.getDate());
    } else if (typeof value === 'string' && ISO_DATE_FORMAT.test(value)) {
      const [year, month, date] = ISO_DATE_FORMAT.exec(value).slice(1).map(s => parseInt(s, 10));
      super(year, month - 1, date, 0, 0, 0, 0);
    } else {
      throw new Error(
        'Invalid date supplied. Please specify a Date object or an ISO date string (YYYY-MM-DD).'
      );
    }
  }

  toISOString() {
    return [this.getFullYear(), pad2(this.getMonth() + 1), pad2(this.getDate())].join('-');
  }

  getHours() {
    warn('You shouldn\'t use LocalDate.getHours as LocalDate is time agnostic.');
    return Date.prototype.getHours.call(this);
  }

  getMinutes() {
    warn('You shouldn\'t use LocalDate.getMinutes as LocalDate is time agnostic.');
    return Date.prototype.getMinutes.call(this);
  }

  getSeconds() {
    warn('You shouldn\'t use LocalDate.getSeconds as LocalDate is time agnostic.');
    return Date.prototype.getSeconds.call(this);
  }

  getMilliseconds() {
    warn('You shouldn\'t use LocalDate.getMilliseconds as LocalDate is time agnostic.');
    return Date.prototype.getMilliseconds.call(this);
  }

}
