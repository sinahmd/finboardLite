import { TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { ApplicationRef } from '@angular/core';
import { TransactionService } from './transaction.service';
import { SupabaseClientService } from './supabase-client.service';
import { ToastService } from './toast.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let appRef: ApplicationRef;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [TransactionService, SupabaseClientService, ToastService]
    });
    service = TestBed.inject(TransactionService);
    appRef = TestBed.inject(ApplicationRef);
    await appRef.whenStable();
  });

  it('should be created', () => expect(service).toBeTruthy());

  it('should load mock data when mockMode is true', () => {
    expect(service.filtered().length).toBeGreaterThan(0);
  });

  it('should have default filter', () => {
    expect(service.filter().search).toBe('');
    expect(service.filter().status).toBe('all');
    expect(service.filter().category).toBe('all');
  });

  it('should filter by search text', () => {
    const all = service.filtered().length;
    service.setFilter({ search: 'test_nonexistent_xyz' });
    expect(service.filtered().length).toBe(0);
    service.resetFilter();
    expect(service.filtered().length).toBe(all);
  });

  it('should filter by status', () => {
    service.setFilter({ status: 'completed' });
    const filtered = service.filtered();
    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach(tx => expect(tx.status).toBe('completed'));
  });

  it('should filter by category', () => {
    service.setFilter({ category: 'purchase' });
    const filtered = service.filtered();
    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach(tx => expect(tx.category).toBe('purchase'));
  });

  it('should paginate results', () => {
    expect(service.page()).toBe(1);
    service.setPage(2);
    expect(service.page()).toBe(2);
    expect(service.paginated().length).toBeLessThanOrEqual(service.pageSize);
  });

  it('should compute summary', () => {
    const s = service.summary();
    expect(s.totalIn).toBeGreaterThanOrEqual(0);
    expect(s.totalOut).toBeGreaterThanOrEqual(0);
    expect(s.count).toBeGreaterThan(0);
  });

  it('should reset filter', () => {
    service.setFilter({ status: 'failed' });
    service.resetFilter();
    expect(service.filter().status).toBe('all');
  });

  it('should select a transaction', () => {
    const first = service.filtered()[0];
    service.selectTransaction(first.id);
    expect(service.selected()?.id).toBe(first.id);
  });

  it('should handle approve transaction in mock mode', async () => {
    const pendingTx = service.filtered().find(t => t.status === 'pending');
    if (pendingTx) {
      await service.approveTransaction(pendingTx.id);
      const updated = service.filtered().find(t => t.id === pendingTx.id);
      expect(updated?.status).toBe('completed');
    }
  });

  it('should handle flag transaction in mock mode', async () => {
    const pendingTx = service.filtered().find(t => t.status === 'pending');
    if (pendingTx) {
      await service.flagTransaction(pendingTx.id);
      const updated = service.filtered().find(t => t.id === pendingTx.id);
      expect(updated?.status).toBe('failed');
    }
  });
});
