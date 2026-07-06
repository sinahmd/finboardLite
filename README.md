# فین‌بورد (FinBoard)

داشبورد مدیریت تراکنش‌های مالی با نمودارهای تعاملی و نرخ لحظه‌ای ارز

## Features

- 📊 Interactive ECharts dashboard (cash flow, monthly volume, category breakdown, status)
- 🔍 Advanced transaction filtering with Jalali date picker
- 💱 Live USD/IRR market rate widget (via pricedb API)
- 🌓 Dark/Light theme toggle
- 📱 Responsive RTL layout
- 💾 Supabase backend (optional — runs in MOCK_MODE by default)

## Tech Stack

- Angular 21 (standalone components, signals, OnPush)
- ECharts (tree-shaken)
- jalali-moment for Persian dates
- Supabase (optional — runs in MOCK_MODE by default)

## Quick Start (Offline Mode)

```bash
npm install
npm start
```

The app runs fully offline with 200 mock transactions by default.

## Supabase Setup (Optional)

To use real persisted data:

### 1. Create a Free Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Note your **Project URL** and **anon public key** from Settings > API

### 2. Run the Migration

1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `supabase/migrations/001_create_transactions.sql`
3. Run the SQL
4. Copy contents of `supabase/migrations/002_seed_transactions.sql`
5. Run the SQL to seed demo transactions

### 3. Configure Environment

Create `src/environments/environment.ts` (or update existing):

```typescript
export const environment = {
  production: false,
  mockMode: false,  // Set to false to use Supabase
  supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
  supabaseAnonKey: 'YOUR-ANON-KEY',
};
```

### 4. Vercel Deployment

Set these environment variables in your Vercel project settings:

```
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `mockMode` | Run offline with mock data | No (defaults to true) |
| `supabaseUrl` | Supabase project URL | Only if mockMode=false |
| `supabaseAnonKey` | Supabase public anon key | Only if mockMode=false |

**Security Note**: Only the public anon key should be in environment files. Never commit the service-role key.

## Row Level Security

The transactions table has RLS enabled with policies that allow:
- Authenticated users to access their own rows (`owner_id = auth.uid()`)
- Anonymous/demo access to rows with null owner (`owner_id IS NULL`)

This is designed for future multi-tenant use. When Supabase Auth is added, the policy will be tightened to require authentication.

## Development

```bash
npm start          # Start dev server
npm test           # Run tests
npm run build      # Production build
```

## License

MIT
