import { formatPersianChartAxis, formatPersianRial, toPersianNumber } from '../../shared/utils/persian-number';

export interface ChartPalette {
  text: string;
  muted: string;
  grid: string;
  tooltipBg: string;
  tooltipBorder: string;
  green: string;
  red: string;
  blue: string;
  yellow: string;
  purple: string;
  teal: string;
  orange: string;
}

const LIGHT: ChartPalette = {
  text: '#1a202c',
  muted: '#64748b',
  grid: 'rgba(100, 116, 139, 0.14)',
  tooltipBg: 'rgba(255, 255, 255, 0.97)',
  tooltipBorder: '#e2e8f0',
  green: '#16a34a',
  red: '#dc2626',
  blue: '#3b82f6',
  yellow: '#d97706',
  purple: '#8b5cf6',
  teal: '#0d9488',
  orange: '#ea580c',
};

const DARK: ChartPalette = {
  text: '#f1f5f9',
  muted: '#94a3b8',
  grid: 'rgba(148, 163, 184, 0.12)',
  tooltipBg: 'rgba(15, 23, 42, 0.95)',
  tooltipBorder: 'rgba(51, 65, 85, 0.8)',
  green: '#4ade80',
  red: '#f87171',
  blue: '#60a5fa',
  yellow: '#fbbf24',
  purple: '#a78bfa',
  teal: '#2dd4bf',
  orange: '#fb923c',
};

export function chartPalette(isDark: boolean): ChartPalette {
  return isDark ? DARK : LIGHT;
}

export function formatCompactRial(value: number): string {
  return formatPersianChartAxis(value);
}

export function formatRial(value: number): string {
  return formatPersianRial(value);
}

/** Custom tooltip formatter for axis-triggered charts (line/bar).
 *  Adds 6px gap between the colored bullet and series name. */
export function axisTooltipFormatter(params: any): string {
  if (!Array.isArray(params) || params.length === 0) return '';
  let html = `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;margin-bottom:4px;font-weight:600">${toPersianNumber(params[0].axisValue)}</div>`;
  params.forEach((p: any) => {
    html += `<div style="display:flex;align-items:center;gap:6px;margin-top:2px">
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0"></span>
      <span style="flex:1">${p.seriesName}</span>
      <span style="font-weight:600;margin-right:4px">${formatRial(p.value)}</span>
    </div>`;
  });
  return html;
}

/** Tooltip formatter for count-based charts (no currency). */
export function countTooltipFormatter(params: any): string {
  if (!Array.isArray(params) || params.length === 0) return '';
  let html = `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;margin-bottom:4px;font-weight:600">${toPersianNumber(params[0].axisValue)}</div>`;
  params.forEach((p: any) => {
    html += `<div style="display:flex;align-items:center;gap:6px;margin-top:2px">
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0"></span>
      <span style="flex:1">${p.seriesName}</span>
      <span style="font-weight:600;margin-right:4px">${toPersianNumber(p.value)}</span>
    </div>`;
  });
  return html;
}

/** Custom tooltip formatter for item-triggered charts (donut/pie).
 *  Adds 6px gap between the colored bullet and category name. */
export function itemTooltipFormatter(params: any): string {
  return `<div style="direction:rtl;font-family:Vazirmatn,sans-serif;display:flex;align-items:center;gap:6px">
    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${params.color};flex-shrink:0"></span>
    <span style="flex:1">${params.name}</span>
    <span style="font-weight:600;margin-right:4px">${toPersianNumber(params.percent)}%</span>
  </div>`;
}
