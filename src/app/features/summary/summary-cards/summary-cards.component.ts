import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction.service';
import { RialPipe } from '../../../shared/pipes/rial.pipe';
import { PersianNumberPipe } from '../../../shared/pipes/persian-number.pipe';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-summary-cards',
  imports: [RialPipe, PersianNumberPipe, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './summary-cards.component.html',
  styleUrl: './summary-cards.component.scss',
})
export class SummaryCardsComponent {
  svc = inject(TransactionService);
}
