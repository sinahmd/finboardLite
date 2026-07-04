import { StatusBadgePipe } from './status-badge.pipe';

describe('StatusBadgePipe', () => {
  let pipe: StatusBadgePipe;
  beforeEach(() => pipe = new StatusBadgePipe());

  it('should map completed', () => {
    expect(pipe.transform('completed').label).toBe('تکمیل شده');
    expect(pipe.transform('completed').cssClass).toBe('badge--success');
  });
  it('should map pending', () => expect(pipe.transform('pending').label).toBe('در انتظار'));
  it('should map failed', () => expect(pipe.transform('failed').label).toBe('ناموفق'));
  it('should map refunded', () => expect(pipe.transform('refunded').label).toBe('بازپرداخت'));
});
