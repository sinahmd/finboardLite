import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="state-empty fade-in">
      <div class="state-empty__icon">{{ icon() }}</div>
      <div class="state-empty__message">{{ message() }}</div>
      @if (ctaLabel()) {
        <button class="state-empty__cta" (click)="ctaClick.emit()">{{ ctaLabel() }}</button>
      }
    </div>
  `,
  styles: [`
    .state-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
      text-align: center;
      gap: 0.75rem;
    }
    .state-empty__icon { font-size: 2.5rem; opacity: 0.5; }
    .state-empty__message { font-size: 0.9rem; color: var(--muted); }
    .state-empty__cta {
      margin-top: 0.5rem;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--primary);
      background: var(--primary);
      color: #fff;
      transition: opacity 0.15s;
      font-family: inherit;
    }
    .state-empty__cta:hover { opacity: 0.85; }
  `]
})
export class EmptyStateComponent {
  icon = input<string>('📋');
  message = input<string>('داده‌ای یافت نشد');
  ctaLabel = input<string>('');
  ctaClick = output<void>();
}
