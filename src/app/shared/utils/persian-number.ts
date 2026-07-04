const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianNumber(value: number | string): string {
  return String(value).replace(/[0-9]/g, d => PERSIAN_DIGITS[parseInt(d)]);
}

export function formatPersianNumber(value: number): string {
  return new Intl.NumberFormat('fa-IR').format(value);
}

export function formatPersianCompact(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (abs >= 1_000_000_000_000) {
    const trillions = (abs / 1_000_000_000_000).toFixed(1);
    return `${sign}${toPersianNumber(trillions)} تریلیارد ریال`;
  }
  if (abs >= 1_000_000_000) {
    const billions = (abs / 1_000_000_000).toFixed(3);
    return `${sign}${toPersianNumber(billions)} میلیارد ریال`;
  }
  if (abs >= 1_000_000) {
    const millions = (abs / 1_000_000).toFixed(1);
    return `${sign}${toPersianNumber(millions)} میلیون ریال`;
  }
  if (abs >= 1_000) {
    return `${sign}${formatPersianNumber(abs)} ریال`;
  }
  return `${sign}${toPersianNumber(abs)} ریال`;
}

export function formatPersianChartAxis(value: number): string {
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';
  
  if (abs >= 1_000_000_000_000) return `${sign}${toPersianNumber((abs / 1_000_000_000_000).toFixed(1))}T`;
  if (abs >= 1_000_000_000) return `${sign}${toPersianNumber((abs / 1_000_000_000).toFixed(1))}B`;
  if (abs >= 1_000_000) return `${sign}${toPersianNumber((abs / 1_000_000).toFixed(1))}M`;
  if (abs >= 1_000) return `${sign}${toPersianNumber((abs / 1_000).toFixed(0))}K`;
  return `${sign}${toPersianNumber(abs)}`;
}

export function formatPersianRial(value: number): string {
  return `${formatPersianNumber(value)} ریال`;
}
