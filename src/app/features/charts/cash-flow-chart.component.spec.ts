import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { CashFlowChartComponent } from './cash-flow-chart.component';

describe('CashFlowChartComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashFlowChartComponent],
      providers: [
        { provide: NGX_ECHARTS_CONFIG, useValue: { echarts: () => import('echarts') } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CashFlowChartComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
