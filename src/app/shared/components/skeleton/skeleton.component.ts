import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="skeleton"
      [class.skeleton--circle]="shape() === 'circle'"
      [class.skeleton--rect]="shape() === 'rect'"
      [style.width]="width()"
      [style.height]="height()"
    ></div>
  `,
})
export class SkeletonComponent {
  width = input<string>('100%');
  height = input<string>('12px');
  shape = input<'line' | 'circle' | 'rect'>('line');
}
