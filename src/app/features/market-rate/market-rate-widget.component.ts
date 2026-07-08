// src/app/features/market-rate/market-rate-widget.component.ts
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MarketRateService } from './market-rate.service';
import { toPersianNumber } from '../../shared/utils/persian-number';

@Component({
  selector: 'app-market-rate-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rate-widget">
      <div class="rate-widget__header">
        <span class="rate-widget__title">نرخ لحظه‌ای دلار</span>
        @if (marketRate.isStale()) {
          <span class="rate-widget__stale">قدیمی</span>
        }
      </div>

      @if (marketRate.isLoading() && !marketRate.rate()) {
        <div class="rate-widget__skeleton">
          <div class="skeleton skeleton--line--lg" style="width: 140px;"></div>
          <div class="skeleton skeleton--line--sm" style="width: 50px;"></div>
        </div>
      } @else if (marketRate.error()) {
        <div class="rate-widget__error">
          <span>{{ marketRate.error() }}</span>
          <button class="rate-widget__retry" (click)="marketRate.refresh()">تلاش مجدد</button>
        </div>
      } @else if (marketRate.rate(); as rate) {
        <div class="rate-widget__price fade-in">
          <span class="rate-widget__value">{{ formatToman(rate.priceInToman) }}</span>
          <span class="rate-widget__unit">تومان</span>
        </div>
      }
    </div>
  `,
  styles: [`
    .rate-widget {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
    }
    .rate-widget__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .rate-widget__title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text);
    }
    .rate-widget__stale {
      font-size: 11px;
      color: var(--warning);
      background: var(--warning-bg);
      padding: 2px 8px;
      border-radius: 4px;
    }
    .rate-widget__skeleton {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .rate-widget__error {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 12px;
      text-align: center;
      color: var(--danger);
      font-size: 13px;
    }
    .rate-widget__retry {
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--danger);
      background: transparent;
      color: var(--danger);
      transition: background 0.15s;
      font-family: inherit;
    }
    .rate-widget__retry:hover {
      background: var(--danger-bg);
    }
    .rate-widget__price {
      display: flex;
      align-items: baseline;
      gap: 8px;
    }
    .rate-widget__value {
      font-size: 28px;
      font-weight: 700;
      color: var(--text);
    }
    .rate-widget__unit {
      font-size: 14px;
      color: var(--muted);
    }
  `]
})
export class MarketRateWidgetComponent {
  marketRate = inject(MarketRateService);

  formatToman(value: number): string {
    return toPersianNumber(value.toLocaleString('en-US'));
  }
}
