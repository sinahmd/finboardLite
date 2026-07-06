// src/app/features/market-rate/market-rate.service.ts
import { Injectable, signal, computed, inject, OnDestroy, resource } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, takeUntil, interval, firstValueFrom, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface MarketRate {
  price: number;      // IRR
  high: number;
  low: number;
  time: string;
  priceInToman: number;
}

interface PricedbResponse {
  success: boolean;
  price: number;
  high: number;
  low: number;
  time: string;
}

@Injectable({ providedIn: 'root' })
export class MarketRateService implements OnDestroy {
  private readonly http = inject(HttpClient);
  private readonly destroy$ = new Subject<void>();

  private readonly _tick = signal(0);
  private readonly _lastFetchTime = signal<number>(0);

  private readonly API_URL = environment.marketRateApiUrl;
  private readonly headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.supabaseAnonKey}`,
  });

  private readonly rateResource = resource<MarketRate, number>({
    params: () => this._tick(),
    loader: async ({ abortSignal }) => {
      const data = await firstValueFrom(
        this.http.get<PricedbResponse>(this.API_URL, { headers: this.headers }).pipe(
          catchError(err => {
            if (err.status === 404) {
              throw new Error('ارز پشتیبانی نمیشود');
            }
            throw new Error('اتصال از بین رفت');
          })
        )
      );
      if (data?.success && data?.price) {
        this._lastFetchTime.set(Date.now());
        return {
          price: data.price,
          high: data.high,
          low: data.low,
          time: data.time,
          priceInToman: Math.round(data.price / 10),
        };
      }
      throw new Error('اطلاعات در دسترس نیست');
    },
  });

  readonly rate = this.rateResource.value;
  readonly isLoading = this.rateResource.isLoading;
  readonly error = this.rateResource.error;

  readonly isStale = computed(() => {
    const lastFetch = this._lastFetchTime();
    if (lastFetch === 0) return false;
    return Date.now() - lastFetch > 60000;
  });

  constructor() {
    interval(60000).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this._tick.update(t => t + 1);
    });
  }

  refresh(): void {
    this._tick.update(t => t + 1);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
