import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CashFlowChartComponent } from './cash-flow-chart.component';
import { MonthlyVolumeChartComponent } from './monthly-volume-chart.component';
import { CategoryDonutChartComponent } from './category-donut-chart.component';
import { StatusBarChartComponent } from './status-bar-chart.component';

@Component({
  selector: 'app-charts-panel',
  standalone: true,
  imports: [
    CashFlowChartComponent,
    MonthlyVolumeChartComponent,
    CategoryDonutChartComponent,
    StatusBarChartComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './charts-panel.component.html',
  styleUrls: ['./charts-panel.component.scss'],
})
export class ChartsPanelComponent {}
