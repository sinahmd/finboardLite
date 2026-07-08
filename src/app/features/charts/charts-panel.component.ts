import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CashFlowChartComponent } from './cash-flow-chart.component';
import { MonthlyVolumeChartComponent } from './monthly-volume-chart.component';
import { CategoryDonutChartComponent } from './category-donut-chart.component';
import { StatusBarChartComponent } from './status-bar-chart.component';
import { TransactionService } from '../../core/services/transaction.service';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-charts-panel',
  imports: [
    CashFlowChartComponent,
    MonthlyVolumeChartComponent,
    CategoryDonutChartComponent,
    StatusBarChartComponent,
    ErrorStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './charts-panel.component.html',
  styleUrl: './charts-panel.component.scss',
})
export class ChartsPanelComponent {
  private readonly txService = inject(TransactionService);
  readonly loading = this.txService.loading;
  readonly error = this.txService.lastError;
  readonly retry = () => this.txService.retry();
}
