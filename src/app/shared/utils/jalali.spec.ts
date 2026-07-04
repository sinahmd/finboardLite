import { formatJalaliDate, formatJalaliDateTime, getJalaliDayMonthLabel, getJalaliMonthYearLabel, parseJalaliDate, jalaliToGregorianString } from './jalali';

describe('jalali utils', () => {
  it('formatJalaliDate returns Persian YYYY/MM/DD', () => {
    const result = formatJalaliDate(new Date(2024, 2, 20));
    expect(result).toMatch(/^[\u06F0-\u06F9]{4}\/[\u06F0-\u06F9]{2}\/[\u06F0-\u06F9]{2}$/);
  });

  it('formatJalaliDateTime includes time', () => {
    const result = formatJalaliDateTime(new Date(2024, 2, 20, 14, 30));
    expect(result).toContain(',');
  });

  it('getJalaliDayMonthLabel has month name', () => {
    const result = getJalaliDayMonthLabel(new Date(2024, 2, 20));
    expect(result.length).toBeGreaterThan(3);
  });

  it('getJalaliMonthYearLabel has month name', () => {
    const result = getJalaliMonthYearLabel(new Date(2024, 2, 20));
    expect(result.length).toBeGreaterThan(2);
  });

  it('parseJalaliDate returns Date for valid', () => {
    expect(parseJalaliDate('1403/01/01')).toBeInstanceOf(Date);
  });

  it('parseJalaliDate returns null for invalid', () => {
    expect(parseJalaliDate('invalid')).toBeNull();
  });

  it('jalaliToGregorianString returns YYYY-MM-DD', () => {
    const result = jalaliToGregorianString('1403/01/01');
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('jalaliToGregorianString returns null for invalid', () => {
    expect(jalaliToGregorianString('bad')).toBeNull();
  });
});
