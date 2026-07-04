import { Injectable, Signal, computed, signal } from '@angular/core';
import { MOCK_TRANSACTIONS } from '../data/mock-transactions';
import { DEFAULT_FILTER, Transaction, TransactionFilter } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly _all     = signal<Transaction[]>(MOCK_TRANSACTIONS);
  private readonly _filter  = signal<TransactionFilter>({ ...DEFAULT_FILTER });
  private readonly _selId   = signal<string | null>(null);
  private readonly _loading = signal<boolean>(false);
  private readonly _page    = signal<number>(1);
  readonly pageSize = 20;

  readonly filter:  Signal<TransactionFilter> = this._filter.asReadonly();
  readonly loading: Signal<boolean>           = this._loading.asReadonly();
  readonly page:    Signal<number>            = this._page.asReadonly();

  readonly filtered = computed(() => {
    const f = this._filter();
    const q = f.search.toLowerCase();
    return this._all().filter(t => {
      if (q && !t.description.toLowerCase().includes(q) && !t.reference.toLowerCase().includes(q)) return false;
      if (f.status   !== 'all' && t.status   !== f.status)   return false;
      if (f.category !== 'all' && t.category !== f.category) return false;
      if (f.type     !== 'all' && t.type     !== f.type)     return false;
      if (f.dateFrom && t.date < new Date(f.dateFrom))                   return false;
      if (f.dateTo   && t.date > new Date(f.dateTo + 'T23:59:59'))       return false;
      if (f.amountMin !== null && t.amount < f.amountMin)                return false;
      if (f.amountMax !== null && t.amount > f.amountMax)                return false;
      return true;
    });
  });

  readonly paginated = computed(() => {
    const start = (this._page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  readonly totalPages = computed(() => Math.max(1, Math.ceil(this.filtered().length / this.pageSize)));

  readonly selected = computed(() => this._all().find(t => t.id === this._selId()) ?? null);

  readonly summary = computed(() => {
    const txns = this.filtered();
    const totalIn  = txns.filter(t => t.type==='credit' && t.status==='completed').reduce((s,t) => s+t.amount, 0);
    const totalOut = txns.filter(t => t.type==='debit'  && t.status==='completed').reduce((s,t) => s+t.amount, 0);
    const pending  = txns.filter(t => t.status==='pending').length;
    const failed   = txns.filter(t => t.status==='failed').length;
    const byCategory = txns.reduce((acc,t) => { acc[t.category]=(acc[t.category]??0)+t.amount; return acc; }, {} as Record<string,number>);
    return { totalIn, totalOut, net: totalIn-totalOut, pending, failed, byCategory, count: txns.length };
  });

  setFilter(partial: Partial<TransactionFilter>): void {
    this._filter.update(f => ({ ...f, ...partial }));
    this._page.set(1);
  }

  resetFilter(): void {
    this._filter.set({ ...DEFAULT_FILTER });
    this._page.set(1);
  }

  setPage(page: number): void { this._page.set(page); }

  selectTransaction(id: string | null): void { this._selId.set(id); }

  approveTransaction(id: string): void {
    this._loading.set(true);
    this._all.update(txns => txns.map(t => t.id===id ? { ...t, status: 'completed' } : t));
    setTimeout(() => this._loading.set(false), 600);
  }

  flagTransaction(id: string): void {
    this._loading.set(true);
    this._all.update(txns => txns.map(t => t.id===id ? { ...t, status: 'failed' } : t));
    setTimeout(() => this._loading.set(false), 600);
  }
}
