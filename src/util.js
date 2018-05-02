// @flow

export function pad2(number: number): number | string {
  return number < 10 ? `0${number}` : number;
}

export function pad3(number: number): number | string {
  return number < 10 ? `00${number}` : number < 100 ? `0${number}` : number;
}
