// src/app/core/services/transaction.service.ts
import { Injectable, Signal, computed, signal, inject, resource } from '@angular/core';
import { MOCK_TRANSACTIONS } from '../data/mock-transactions';
import { DEFAULT_FILTER, Transaction, TransactionFilter } from '../models/transaction.model';
import { SupabaseClientService } from './supabase-client.service';
import { ToastService } from './toast.service';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly supabase = inject(SupabaseClientService);
  private readonly toast = inject(ToastService);

  private readonly _filter  = signal<TransactionFilter>({ ...DEFAULT_FILTER });
  private readonly _selId   = signal<string | null>(null);
  private readonly _page    = signal<number>(1);
  readonly pageSize = 20;

  private readonly transactions = resource<Transaction[], void>({
    loader: async ({ abortSignal }) => {
      if (environment.mockMode || !this.supabase.isConfigured) {
        return MOCK_TRANSACTIONS;
      }

      const { data, error } = await this.supabase.client!
        .from('transactions')
        .select('*')
        .order('date', { ascending: false })
        .abortSignal(abortSignal);

      if (error) throw error;

      return data.map(this.mapRow);
    },
    defaultValue: [],
  });

  readonly filter:  Signal<TransactionFilter> = this._filter.asReadonly();
  readonly loading: Signal<boolean>           = this.transactions.isLoading;
  readonly page:    Signal<number>            = this._page.asReadonly();
  readonly lastError: Signal<Error | undefined> = this.transactions.error;
  readonly initialized: Signal<boolean>       = computed(() => this.transactions.status() === 'resolved');

  readonly filtered = computed(() => {
    const all = this.transactions.value();
    const f = this._filter();
    const q = f.search.toLowerCase();
    return all.filter(t => {
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

  readonly selected = computed(() => {
    const id = this._selId();
    if (!id) return null;
    return this.transactions.value().find(t => t.id === id) ?? null;
  });

  readonly summary = computed(() => {
    const txns = this.filtered();
    const totalIn  = txns.filter(t => t.type==='credit' && t.status==='completed').reduce((s,t) => s+t.amount, 0);
    const totalOut = txns.filter(t => t.type==='debit'  && t.status==='completed').reduce((s,t) => s+t.amount, 0);
    const pending  = txns.filter(t => t.status==='pending').length;
    const failed   = txns.filter(t => t.status==='failed').length;
    const byCategory = txns.reduce((acc,t) => { acc[t.category]=(acc[t.category]??0)+t.amount; return acc; }, {} as Record<string,number>);
    return { totalIn, totalOut, net: totalIn-totalOut, pending, failed, byCategory, count: txns.length };
  });

  retry(): void {
    this.transactions.reload();
  }

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

  async approveTransaction(id: string): Promise<void> {
    // Save previous state for per row rollback
    const previousTx = this.transactions.value().find(t => t.id === id);
    if (!previousTx) return;

    // Optimistic update, single row only
    this.transactions.update(txns => txns.map(t => t.id === id ? { ...t, status: 'completed' as const } : t));

    if (environment.mockMode || !this.supabase.isConfigured) {
      await new Promise(r => setTimeout(r, 600));
      return;
    }

    try {
      const { error } = await this.supabase.client!
        .from('transactions')
        .update({ status: 'completed' })
        .eq('id', id);

      if (error) throw error;
    } catch (e: any) {
      // Per-row rollback, only revert this specific row, not the entire array
      this.transactions.update(txns => txns.map(t => t.id === id ? previousTx : t));
      this.toast.show(e.message || 'Failed to approve transaction', 'error');
    }
  }

  async flagTransaction(id: string): Promise<void> {
    const previousTx = this.transactions.value().find(t => t.id === id);
    if (!previousTx) return;

    this.transactions.update(txns => txns.map(t => t.id === id ? { ...t, status: 'failed' as const } : t));

    if (environment.mockMode || !this.supabase.isConfigured) {
      await new Promise(r => setTimeout(r, 600));
      return;
    }

    try {
      const { error } = await this.supabase.client!
        .from('transactions')
        .update({ status: 'failed' })
        .eq('id', id);

      if (error) throw error;
    } catch (e: any) {
      // Per row rollback
      this.transactions.update(txns => txns.map(t => t.id === id ? previousTx : t));
      this.toast.show(e.message || 'Failed to flag transaction', 'error');
    }
  }

  private mapRow(row: any): Transaction {
    return {
      id: row.id,
      date: new Date(row.date),
      description: row.description,
      amount: Number(row.amount),
      type: row.type,
      status: row.status,
      category: row.category,
      merchant: row.merchant,
      reference: row.reference,
    };
  }
}
