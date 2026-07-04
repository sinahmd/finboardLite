import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { StatusBarChartComponent } from './status-bar-chart.component';

describe('StatusBarChartComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBarChartComponent],
      providers: [
        { provide: NGX_ECHARTS_CONFIG, useValue: { echarts: () => import('echarts') } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(StatusBarChartComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
