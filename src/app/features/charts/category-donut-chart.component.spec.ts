import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { CategoryDonutChartComponent } from './category-donut-chart.component';

describe('CategoryDonutChartComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDonutChartComponent],
      providers: [
        { provide: NGX_ECHARTS_CONFIG, useValue: { echarts: () => import('echarts') } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CategoryDonutChartComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
