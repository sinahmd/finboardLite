import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { ChartDataService } from './chart-data.service';
import { ThemeService } from '../../core/services/theme.service';
import { chartPalette, itemTooltipFormatter } from './chart-theme';

@Component({
  selector: 'app-category-donut-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category-donut-chart.component.html',
  styleUrls: ['./category-donut-chart.component.scss'],
})
export class CategoryDonutChartComponent {
  private readonly data = inject(ChartDataService);
  private readonly theme = inject(ThemeService);

  readonly option = computed<EChartsOption>(() => {
    const d = this.data.categoryData();
    const c = chartPalette(this.theme.isDark());
    const palette = [c.blue, c.green, c.yellow, c.purple, c.teal, c.orange];

    return {
      color: palette,
      tooltip: {
        trigger: 'item',
        backgroundColor: c.tooltipBg,
        borderColor: c.tooltipBorder,
        borderWidth: 1,
        padding: [8, 12],
        textStyle: { color: c.text, fontSize: 12 },
        formatter: itemTooltipFormatter,
        confine: true,
      },
      legend: {
        bottom: 0,
        type: 'scroll',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { color: c.muted, fontSize: 11 },
      },
      series: [
        {
          name: 'هزینه بر اساس دسته‌بندی',
          type: 'pie',
          radius: ['58%', '78%'],
          center: ['50%', '44%'],
          avoidLabelOverlap: true,
          itemStyle: { borderColor: 'transparent', borderWidth: 2 },
          label: { show: false },
          labelLine: { show: false },
          emphasis: {
            label: { show: true, fontSize: 13, fontWeight: 700, color: c.text },
          },
          data: d.labels.map((name, i) => ({ name, value: d.values[i] })),
        },
      ],
    };
  });
}
