import { RialPipe } from './rial.pipe';

describe('RialPipe', () => {
  let pipe: RialPipe;
  beforeEach(() => pipe = new RialPipe());

  it('should format full number in Persian', () => expect(pipe.transform(12500000)).toBe('۱۲٬۵۰۰٬۰۰۰ ریال'));
  it('should format short >= 1B in Persian as میلیارد', () => expect(pipe.transform(1076026857, true)).toBe('۱.۰۷۶ میلیارد ریال'));
  it('should format short >= 1M in Persian as میلیون', () => expect(pipe.transform(12500000, true)).toBe('۱۲.۵ میلیون ریال'));
  it('should handle negatives >= 1B in Persian as میلیارد', () => expect(pipe.transform(-1076026857, true)).toBe('-۱.۰۷۶ میلیارد ریال'));
  it('should handle negatives >= 1M in Persian as میلیون', () => expect(pipe.transform(-961902424, true)).toBe('-۹۶۱.۹ میلیون ریال'));
  it('should not shorten < 1M in Persian', () => expect(pipe.transform(500000, true)).toBe('۵۰۰٬۰۰۰ ریال'));
  it('should handle zero in Persian', () => expect(pipe.transform(0)).toBe('۰ ریال'));
});
