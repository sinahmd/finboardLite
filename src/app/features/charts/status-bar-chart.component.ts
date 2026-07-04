import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ChartDataService } from './chart-data.service';
import { ThemeService } from '../../core/services/theme.service';
import { chartPalette, countTooltipFormatter } from './chart-theme';
import { toPersianNumber } from '../../shared/utils/persian-number';

@Component({
  selector: 'app-status-bar-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './status-bar-chart.component.html',
  styleUrls: ['./status-bar-chart.component.scss'],
})
export class StatusBarChartComponent {
  private readonly data = inject(ChartDataService);
  private readonly theme = inject(ThemeService);

  readonly option = computed<EChartsOption>(() => {
    const d = this.data.statusData();
    const c = chartPalette(this.theme.isDark());
    const statusColors = [c.green, c.yellow, c.red, c.blue];

    return {
      grid: { left: 8, right: 24, top: 8, bottom: 4, containLabel: true },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: c.tooltipBg,
        borderColor: c.tooltipBorder,
        borderWidth: 1,
        padding: [8, 12],
        textStyle: { color: c.text, fontSize: 12 },
        formatter: countTooltipFormatter,
        confine: true,
      },
      xAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: c.grid } },
        axisLabel: { color: c.muted, fontSize: 10, formatter: (v: number) => toPersianNumber(v) },
      },
      yAxis: {
        type: 'category',
        data: d.labels,
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: c.muted, fontSize: 11 },
      },
      series: [
        {
          name: 'تراکنش‌ها',
          type: 'bar',
          barWidth: '55%',
          itemStyle: {
            borderRadius: [0, 6, 6, 0],
            color: (params: { dataIndex: number }) => statusColors[params.dataIndex % statusColors.length],
          },
          data: d.values,
        },
      ],
    };
  });
}
