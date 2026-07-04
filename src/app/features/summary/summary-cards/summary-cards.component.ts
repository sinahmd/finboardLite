import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../../core/services/transaction.service';
import { RialPipe } from '../../../shared/pipes/rial.pipe';
import { PersianNumberPipe } from '../../../shared/pipes/persian-number.pipe';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule, RialPipe, PersianNumberPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss'],
})
export class SummaryCardsComponent {
  svc = inject(TransactionService);
}
