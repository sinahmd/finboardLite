import { Component, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';
import { RialPipe } from '../../../shared/pipes/rial.pipe';
import { StatusBadgePipe } from '../../../shared/pipes/status-badge.pipe';
import { CategoryLabelPipe } from '../../../shared/pipes/category-label.pipe';
import { formatJalaliDateTimeFull } from '../../../shared/utils/jalali';

@Component({
  selector: 'app-transaction-detail',
  imports: [RialPipe, StatusBadgePipe, CategoryLabelPipe],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
})
export class TransactionDetailComponent {
  svc = inject(TransactionService);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);
  formatJalaliFull = formatJalaliDateTimeFull;

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.svc.selectTransaction(id);
  }

  back(): void    { this.router.navigate(['/']); }
  approve(id: string): void { this.svc.approveTransaction(id); }
  flag(id: string): void    { this.svc.flagTransaction(id); }
}
