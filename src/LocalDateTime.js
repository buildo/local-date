// @flow

import { pad2, pad3 } from './util';

export default class LocalDateTime extends Date {

  static ISO_DATE_TIME_FORMAT = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.(\d{3}))?$/

  static test(isoDateTime: string) {
    return LocalDateTime.ISO_DATE_TIME_FORMAT.test(isoDateTime);
  }

  constructor(value: LocalDateTime | string | void) {
    if (typeof value === 'undefined') {
      super(new Date());
    } else if (value instanceof LocalDateTime) {
      super(
        value.getFullYear(), value.getMonth(), value.getDate(),
        value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds()
      );
    } else if (typeof value === 'string' && LocalDateTime.ISO_DATE_TIME_FORMAT.test(value)) {
      const [
        year,
        month,
        date,
        hours,
        minutes,
        seconds,
        ,
        milliseconds
      ] = LocalDateTime.ISO_DATE_TIME_FORMAT.exec(value).slice(1).map(s => parseInt(s, 10));
      super(year, month - 1, date, hours, minutes, seconds, milliseconds || 0);
    } else {
      throw new Error('Invalid date supplied. Please specify an ISO date time string (YYYY-MM-DDTHH:mm:SS) or a LocalDateTime object.\nhttps://github.com/buildo/local-date#parser'); // eslint-disable-line max-len
    }
  }

  toISOString(): string {
    const date = [this.getFullYear(), pad2(this.getMonth() + 1), pad2(this.getDate())].join('-');
    const time = [
      pad2(this.getHours()), pad2(this.getMinutes()), pad2(this.getSeconds())
    ].join(':');
    const milliseconds = pad3(this.getMilliseconds());
    return `${date}T${time}.${milliseconds}`;
  }

}
