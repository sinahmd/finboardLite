import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import { ChartsPanelComponent } from './charts-panel.component';

describe('ChartsPanelComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsPanelComponent, RouterTestingModule],
      providers: [
        { provide: NGX_ECHARTS_CONFIG, useValue: { echarts: () => import('echarts') } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ChartsPanelComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render analytics header', () => {
    const fixture = TestBed.createComponent(ChartsPanelComponent);
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2');
    expect(h2?.textContent).toContain('تحلیل و آمار');
  });

  it('should render 4 chart cards', () => {
    const fixture = TestBed.createComponent(ChartsPanelComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.chart-card').length).toBe(4);
  });
});
