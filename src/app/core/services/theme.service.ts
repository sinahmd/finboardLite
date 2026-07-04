import { Injectable, computed, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

/**
 * Single source of truth for light/dark mode.
 *
 * Kept as a plain signal (not a BehaviorSubject) so it can be read from
 * `computed()` blocks without a subscription — chart option factories in
 * `features/charts` depend on `isDark()` and re-derive automatically
 * whenever the person flips the theme toggle.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _mode = signal<ThemeMode>(this.detectPreferred());

  readonly mode: () => ThemeMode = this._mode.asReadonly();
  readonly isDark = computed(() => this._mode() === 'dark');

  toggle(): void {
    this._mode.update(m => (m === 'light' ? 'dark' : 'light'));
  }

  private detectPreferred(): ThemeMode {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }
}
