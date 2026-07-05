import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ChartDataService } from './chart-data.service';
import { ThemeService } from '../../core/services/theme.service';
import { chartPalette, formatCompactRial, axisTooltipFormatter } from './chart-theme';

@Component({
  selector: 'app-monthly-volume-chart',
  imports: [NgxEchartsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './monthly-volume-chart.component.html',
  styleUrl: './monthly-volume-chart.component.scss',
})
export class MonthlyVolumeChartComponent {
  private readonly data = inject(ChartDataService);
  private readonly theme = inject(ThemeService);

  readonly option = computed<EChartsOption>(() => {
    const d = this.data.monthlyData();
    const c = chartPalette(this.theme.isDark());

    return {
      color: [c.green, c.red],
      grid: { left: 8, right: 12, top: 36, bottom: 4, containLabel: true },
      legend: {
        top: 0,
        right: 0,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: c.muted, fontSize: 11 },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: c.tooltipBg,
        borderColor: c.tooltipBorder,
        borderWidth: 1,
        padding: [8, 12],
        textStyle: { color: c.text, fontSize: 12 },
        formatter: axisTooltipFormatter,
        confine: true,
      },
      xAxis: {
        type: 'category',
        data: d.labels,
        axisLine: { lineStyle: { color: c.grid } },
        axisTick: { show: false },
        axisLabel: { color: c.muted, fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: c.grid } },
        axisLabel: { color: c.muted, fontSize: 10, formatter: (v: number) => formatCompactRial(v) },
      },
      series: [
        {
          name: 'واریزی',
          type: 'bar',
          barGap: '20%',
          itemStyle: { borderRadius: [4, 4, 0, 0] },
          data: d.credits,
        },
        {
          name: 'برداشت',
          type: 'bar',
          itemStyle: { borderRadius: [4, 4, 0, 0] },
          data: d.debits,
        },
      ],
    };
  });
}
