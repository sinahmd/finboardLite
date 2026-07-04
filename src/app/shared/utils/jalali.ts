
import moment from 'jalali-moment';
import { toPersianNumber } from './persian-number';

const JALALI_MONTH_NAMES: string[] = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

function getMonthName(date: Date): string {
  const m = moment(date);
  const monthIndex = m.jMonth(); // 0-11
  return JALALI_MONTH_NAMES[monthIndex] ?? '';
}

export function formatJalaliDate(date: Date): string {
  const m = moment(date);
  const jy = m.jYear();
  const jm = m.jMonth() + 1;
  const jd = m.jDate();
  return toPersianNumber(`${jy}/${pad(jm)}/${pad(jd)}`);
}

export function formatJalaliDateTime(date: Date): string {
  const m = moment(date);
  const time = `${pad(m.hours())}:${pad(m.minutes())}`;
  return `${formatJalaliDate(date)}, ${toPersianNumber(time)}`;
}

export function formatJalaliDateTimeFull(date: Date): string {
  const m = moment(date);
  const time = `${pad(m.hours())}:${pad(m.minutes())}:${pad(m.seconds())}`;
  return `${formatJalaliDate(date)}, ${toPersianNumber(time)}`;
}

export function getJalaliDayMonthLabel(date: Date): string {
  const m = moment(date);
  return `${toPersianNumber(m.jDate())} ${getMonthName(date)}`;
}

export function getJalaliMonthYearLabel(date: Date): string {
  const m = moment(date);
  const twoDigitYear = String(m.jYear()).slice(-2);
  return `${toPersianNumber(twoDigitYear)} ${getMonthName(date)}`;
}

export function parseJalaliDate(jalaliStr: string): Date | null {
  const m = moment(jalaliStr, 'jYYYY/jMM/jDD', true);
  if (!m.isValid()) return null;
  return m.toDate();
}

export function jalaliToGregorianString(jalaliStr: string): string | null {
  const d = parseJalaliDate(jalaliStr);
  if (!d) return null;
  return moment(d).format('YYYY-MM-DD');
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function toPersianPad(n: number): string {
  return toPersianNumber(String(n).padStart(2, '0'));
}

export const JALALI_MONTHS: string[] = JALALI_MONTH_NAMES;

export const JALALI_WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
