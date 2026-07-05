import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ChartDataService } from './chart-data.service';
import { ThemeService } from '../../core/services/theme.service';
import { chartPalette, formatCompactRial, axisTooltipFormatter } from './chart-theme';

@Component({
  selector: 'app-cash-flow-chart',
  imports: [NgxEchartsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cash-flow-chart.component.html',
  styleUrl: './cash-flow-chart.component.scss',
})
export class CashFlowChartComponent {
  private readonly data = inject(ChartDataService);
  private readonly theme = inject(ThemeService);

  readonly option = computed<EChartsOption>(() => {
    const d = this.data.dailyVolumeData();
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
        boundaryGap: false,
        axisLine: { lineStyle: { color: c.grid } },
        axisTick: { show: false },
        axisLabel: { color: c.muted, fontSize: 10, interval: Math.ceil(d.labels.length / 8) },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: c.grid } },
        axisLabel: { color: c.muted, fontSize: 10, formatter: (v: number) => formatCompactRial(v) },
      },
      series: [
        {
          name: 'واریزی',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: { width: 2 },
          areaStyle: { opacity: 0.15 },
          data: d.credits,
        },
        {
          name: 'برداشت',
          type: 'line',
          smooth: true,
          symbol: 'none',
          lineStyle: { width: 2 },
          areaStyle: { opacity: 0.15 },
          data: d.debits,
        },
      ],
    };
  });
}
