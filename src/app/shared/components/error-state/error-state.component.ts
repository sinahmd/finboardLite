import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="state-error fade-in">
      <div class="state-error__icon">⚠️</div>
      <div class="state-error__message">{{ message() }}</div>
      <button class="state-error__retry" (click)="retry.emit()">تلاش مجدد</button>
    </div>
  `,
  styles: [`
    .state-error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1.5rem;
      text-align: center;
      gap: 0.75rem;
    }
    .state-error__icon { font-size: 2.5rem; opacity: 0.5; }
    .state-error__message { font-size: 0.9rem; color: var(--danger); }
    .state-error__retry {
      margin-top: 0.5rem;
      padding: 0.5rem 1.25rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--danger);
      background: transparent;
      color: var(--danger);
      transition: background 0.15s;
      font-family: inherit;
    }
    .state-error__retry:hover { background: var(--danger-bg); }
  `]
})
export class ErrorStateComponent {
  message = input<string>('خطا در بارگذاری اطلاعات');
  retry = output<void>();
}
