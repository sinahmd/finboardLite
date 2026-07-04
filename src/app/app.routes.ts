import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'transactions/:id',
    loadComponent: () =>
      import('./features/transactions/transaction-detail/transaction-detail.component')
        .then(m => m.TransactionDetailComponent),
  },
  { path: '**', redirectTo: '' },
];
