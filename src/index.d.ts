declare module 'local-date' {
  export class LocalDate extends Date {
    static ISO_DATE_FORMAT: RegExp;
    static test(iso: string): boolean;
  }
  export class LocalDateTime extends Date {
    static ISO_DATE_TIME_FORMAT: RegExp;
    static test(iso: string): boolean;
  }
}
