/**
 * Custom ECharts build.
 *
 * `ngx-echarts` lazy-loads whatever module `provideEchartsCore` points at
 * (see app.config.ts) the first time a chart mounts. Importing from
 * `echarts/core` and registering only the pieces finboard actually renders
 * — line, bar, pie, plus canvas rendering — keeps that chunk a fraction of
 * the ~1MB full `echarts` bundle instead of shipping every chart type,
 * geo map, and 3D renderer nobody asked for.
 */
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  LineChart,
  PieChart,
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

export * from 'echarts/core';
