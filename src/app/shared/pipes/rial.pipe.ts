import { Pipe, PipeTransform } from '@angular/core';
import { formatPersianCompact, formatPersianRial } from '../utils/persian-number';

@Pipe({ name: 'rial', standalone: true })
export class RialPipe implements PipeTransform {
  transform(value: number, short = false): string {
    if (short && Math.abs(value) >= 1_000_000) {
      return formatPersianCompact(value);
    }
    return formatPersianRial(value);
  }
}
