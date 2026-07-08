import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';
import { RialPipe } from '../../../shared/pipes/rial.pipe';
import { StatusBadgePipe } from '../../../shared/pipes/status-badge.pipe';
import { CategoryLabelPipe } from '../../../shared/pipes/category-label.pipe';
import { PersianNumberPipe } from '../../../shared/pipes/persian-number.pipe';
import { Transaction } from '../../../core/models/transaction.model';
import { formatJalaliDateTime } from '../../../shared/utils/jalali';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-transaction-table',
  imports: [RialPipe, StatusBadgePipe, CategoryLabelPipe, PersianNumberPipe, EmptyStateComponent, ErrorStateComponent],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss',
})
export class TransactionTableComponent {
  svc = inject(TransactionService);
  private router = inject(Router);
  formatJalali = formatJalaliDateTime;
  skeletonRows = [1, 2, 3, 4, 5, 6, 7, 8];

  open(tx: Transaction): void {
    this.svc.selectTransaction(tx.id);
    this.router.navigate(['/transactions', tx.id]);
  }

  approve(id: string): void { this.svc.approveTransaction(id); }
  flag(id: string): void    { this.svc.flagTransaction(id); }

  pageRange(): number[] {
    const total = this.svc.totalPages(), cur = this.svc.page(), delta = 2;
    const range: number[] = [];
    for (let i = Math.max(1, cur-delta); i <= Math.min(total, cur+delta); i++) range.push(i);
    return range;
  }
}
