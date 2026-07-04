import { Pipe, PipeTransform } from '@angular/core';
import { TransactionStatus } from '../../core/models/transaction.model';

export interface BadgeConfig { label: string; cssClass: string; }

const MAP: Record<TransactionStatus, BadgeConfig> = {
  completed: { label: 'تکمیل شده', cssClass: 'badge--success' },
  pending:   { label: 'در انتظار',   cssClass: 'badge--warning' },
  failed:    { label: 'ناموفق',    cssClass: 'badge--danger'  },
  refunded:  { label: 'بازپرداخت',  cssClass: 'badge--info'    },
};

@Pipe({ name: 'statusBadge', standalone: true })
export class StatusBadgePipe implements PipeTransform {
  transform(status: TransactionStatus): BadgeConfig { return MAP[status]; }
}
