import { CategoryLabelPipe } from './category-label.pipe';

describe('CategoryLabelPipe', () => {
  let pipe: CategoryLabelPipe;
  beforeEach(() => pipe = new CategoryLabelPipe());

  it('should translate purchase', () => expect(pipe.transform('purchase')).toBe('خرید'));
  it('should translate transfer', () => expect(pipe.transform('transfer')).toBe('انتقال'));
  it('should translate withdrawal', () => expect(pipe.transform('withdrawal')).toBe('برداشت'));
  it('should translate deposit', () => expect(pipe.transform('deposit')).toBe('واریز'));
  it('should translate fee', () => expect(pipe.transform('fee')).toBe('کارمزد'));
  it('should return unknown as-is', () => expect(pipe.transform('unknown')).toBe('unknown'));
});
