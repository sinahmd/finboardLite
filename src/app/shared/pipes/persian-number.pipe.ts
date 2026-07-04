import { Pipe, PipeTransform } from '@angular/core';
import { toPersianNumber } from '../utils/persian-number';

@Pipe({ name: 'persianNumber', standalone: true })
export class PersianNumberPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value == null) return '';
    return toPersianNumber(value);
  }
}
