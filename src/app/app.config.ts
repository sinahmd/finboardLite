import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideEchartsCore } from 'ngx-echarts';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    // Dynamic import → our tree-shaken build only downloads once a chart
    // actually mounts, and never blocks the initial bundle.
    provideEchartsCore({ echarts: () => import('./core/echarts-setup') }),
  ],
};
