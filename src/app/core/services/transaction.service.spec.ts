import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => expect(service).toBeTruthy());

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
    service.filtered().forEach(tx => expect(tx.status).toBe('completed'));
  });

  it('should filter by category', () => {
    service.setFilter({ category: 'purchase' });
    service.filtered().forEach(tx => expect(tx.category).toBe('purchase'));
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
});
