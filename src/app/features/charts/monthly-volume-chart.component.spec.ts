import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { MonthlyVolumeChartComponent } from './monthly-volume-chart.component';

describe('MonthlyVolumeChartComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyVolumeChartComponent],
      providers: [
        { provide: NGX_ECHARTS_CONFIG, useValue: { echarts: () => import('echarts') } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MonthlyVolumeChartComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
