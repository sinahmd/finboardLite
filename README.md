# FinBoard – Angular 17 Transaction Dashboard

A modern fintech dashboard built with Angular 17, featuring Farsi/RTL UI, Jalali (Solar Hijri) calendar, and comprehensive unit tests.

## Quick Start

```bash
npm install
ng serve
# open http://localhost:4200
```

## Features

- **Farsi/RTL UI** — Full Persian interface with Vazirmatn font
- **Jalali Calendar** — Solar Hijri dates with interactive datepicker
- **200 mock transactions** — Realistic Iranian fintech merchants and Rial currency
- **Signals-based state** — `signal()` / `computed()` — no NgRx
- **Reactive Forms** — Search with debounce, instant filters on dropdowns
- **Optimistic UI** — Approve/flag actions with loading state
- **Lazy-loaded routes** — Dashboard + detail page as separate chunks
- **Light/dark theme** — CSS custom properties with one-click toggle
- **ECharts analytics** — Daily cash flow, monthly volume, category donut, status bar
- **63 unit tests** — Services, pipes, utilities, and all components
- **OnPush change detection** — Applied to signal-driven components

## Architecture

```
src/app/
├── core/
│   ├── data/          # Mock transaction generator
│   ├── models/        # TypeScript interfaces
│   └── services/      # TransactionService (signals), ThemeService
├── features/
│   ├── dashboard/     # Main page layout
│   ├── summary/       # KPI cards
│   ├── transactions/  # Filter bar, table, detail page
│   └── charts/        # 4 ECharts visualizations
└── shared/
    ├── pipes/         # RialPipe, StatusBadgePipe, CategoryLabelPipe
    ├── jalali-datepicker/  # Custom Solar calendar component
    └── utils/         # Jalali date conversion utilities
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Angular 17 (standalone components) |
| State | Angular Signals |
| Styling | SCSS, CSS custom properties |
| Charts | ECharts + ngx-echarts |
| Dates | moment + jalali-moment |
| Testing | Jasmine + Karma |
| Deploy | Vercel |

## Testing

```bash
# Run all tests
ng test

# Run in headless Chrome
ng test --watch=false --browsers=ChromeHeadless

# Build
ng build
```

## Deploy to Vercel

```bash
npx vercel --prod
```

## Interview Talking Points

- **Signals vs NgRx**: State is local and non-shared — signals give fine-grained reactivity with zero boilerplate
- **OnPush**: Applied to pure display components (summary cards, charts) for optimal rendering
- **Debounce only on search**: Dropdowns are O(1) re-renders; text search benefits from coalescing keystrokes
- **Optimistic UI**: Signal updates before simulated API resolves — in production you'd roll back on error
- **Lazy routes**: Each feature is its own JS chunk for fast initial load
- **Jalali calendar**: Custom datepicker using jalali-moment for Persian date support
- **RTL layout**: Full right-to-left support with proper CSS logical properties
