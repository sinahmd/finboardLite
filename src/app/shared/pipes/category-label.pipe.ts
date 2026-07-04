import { Pipe, PipeTransform } from '@angular/core';

const LABELS: Record<string, string> = {
  purchase: 'خرید',
  transfer: 'انتقال',
  withdrawal: 'برداشت',
  deposit: 'واریز',
  fee: 'کارمزد',
};

@Pipe({ name: 'categoryLabel', standalone: true })
export class CategoryLabelPipe implements PipeTransform {
  transform(category: string): string {
    return LABELS[category] ?? category;
  }
}
