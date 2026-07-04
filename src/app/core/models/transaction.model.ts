export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'refunded';
export type TransactionType = 'debit' | 'credit';
export type TransactionCategory = 'transfer' | 'purchase' | 'withdrawal' | 'deposit' | 'fee';

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  category: TransactionCategory;
  merchant: string;
  reference: string;
}

export interface TransactionFilter {
  search: string;
  status: TransactionStatus | 'all';
  category: TransactionCategory | 'all';
  type: TransactionType | 'all';
  dateFrom: string;
  dateTo: string;
  amountMin: number | null;
  amountMax: number | null;
}

export const DEFAULT_FILTER: TransactionFilter = {
  search: '',
  status: 'all',
  category: 'all',
  type: 'all',
  dateFrom: '',
  dateTo: '',
  amountMin: null,
  amountMax: null,
};
