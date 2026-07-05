import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SummaryCardsComponent } from '../summary/summary-cards/summary-cards.component';
import { FilterBarComponent } from '../transactions/filter-bar/filter-bar.component';
import { TransactionTableComponent } from '../transactions/transaction-table/transaction-table.component';
import { ChartsPanelComponent } from '../charts/charts-panel.component';

@Component({
  selector: 'app-dashboard',
  imports: [SummaryCardsComponent, FilterBarComponent, TransactionTableComponent, ChartsPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
