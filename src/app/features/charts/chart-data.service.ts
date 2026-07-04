import { Injectable, computed, inject } from '@angular/core';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../../core/models/transaction.model';
import { getJalaliDayMonthLabel, getJalaliMonthYearLabel } from '../../shared/utils/jalali';
import moment from 'jalali-moment';

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getLast30Days(): string[] {
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(formatDate(d));
  }
  return days;
}

function getLast12Months(): string[] {
  const months: string[] = [];
  const seen = new Set<string>();
  for (let i = 11; i >= 0; i--) {
    const d = moment().startOf('jMonth').add(-i, 'jMonth');
    const label = getJalaliMonthYearLabel(d.toDate());
    if (!seen.has(label)) {
      seen.add(label);
      months.push(label);
    }
  }
  return months;
}

@Injectable({ providedIn: 'root' })
export class ChartDataService {
  private txService = inject(TransactionService);

  readonly categoryData = computed(() => {
    const txns = this.txService.filtered().filter(t => t.type === 'debit' && t.status === 'completed');
    const map: Record<string, number> = {};
    txns.forEach(t => { map[t.category] = (map[t.category] ?? 0) + t.amount; });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    return {
      labels: sorted.map(([k]) => categoryLabel(k)),
      values: sorted.map(([, v]) => v),
    };
  });

  readonly dailyVolumeData = computed(() => {
    const days = getLast30Days();
    const txns = this.txService.filtered();
    const creditMap: Record<string, number> = {};
    const debitMap: Record<string, number> = {};
    days.forEach(d => { creditMap[d] = 0; debitMap[d] = 0; });

    txns.forEach(t => {
      const day = formatDate(t.date);
      if (!(day in creditMap)) return;
      if (t.type === 'credit' && t.status === 'completed') creditMap[day] += t.amount;
      if (t.type === 'debit'  && t.status === 'completed') debitMap[day]  += t.amount;
    });

    return {
      labels: days.map(d => getJalaliDayMonthLabel(new Date(d + 'T00:00:00'))),
      credits: days.map(d => creditMap[d]),
      debits:  days.map(d => debitMap[d]),
    };
  });

  readonly monthlyData = computed(() => {
    const months = getLast12Months();
    const txns = this.txService.filtered();
    const creditMap: Record<string, number> = {};
    const debitMap: Record<string, number> = {};
    months.forEach(m => { creditMap[m] = 0; debitMap[m] = 0; });

    txns.forEach(t => {
      const key = getJalaliMonthYearLabel(t.date);
      if (!(key in creditMap)) return;
      if (t.type === 'credit' && t.status === 'completed') creditMap[key] += t.amount;
      if (t.type === 'debit'  && t.status === 'completed') debitMap[key]  += t.amount;
    });

    return {
      labels:  months,
      credits: months.map(m => creditMap[m]),
      debits:  months.map(m => debitMap[m]),
    };
  });

  readonly statusData = computed(() => {
    const txns = this.txService.filtered();
    const map: Record<string, number> = { completed: 0, pending: 0, failed: 0, refunded: 0 };
    txns.forEach(t => { map[t.status]++; });
    return {
      labels: ['تکمیل شده', 'در انتظار', 'ناموفق', 'بازپرداخت شده'],
      values: [map['completed'], map['pending'], map['failed'], map['refunded']],
    };
  });
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    purchase: 'خرید',
    transfer: 'انتقال',
    withdrawal: 'برداشت',
    deposit: 'واریز',
    fee: 'کارمزد',
  };
  return map[cat] ?? cat;
}
