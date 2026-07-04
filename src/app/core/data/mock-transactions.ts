import { Transaction, TransactionCategory, TransactionStatus, TransactionType } from '../models/transaction.model';

const merchants: Record<TransactionCategory, string[]> = {
  purchase:   ['دیجی‌کالا', 'اسنپ‌فود', 'بامیلو', 'کافه‌بازار', 'تپسی', 'دیوار', 'توربو'],
  transfer:   ['بانک ملت', 'بانک ملی', 'بانک پارسیان', 'بانک تجارت', 'بانک صادرات'],
  withdrawal: ['خودپرداز ونک', 'خودپرداز تجریش', 'خودپرداز آزادی', 'خودپرداز انقلاب', 'خودپرداز فردوسی'],
  deposit:    ['حقوق', 'درآمد فریلنسری', 'بازپرداخت', 'سود سپرده', 'پاداش'],
  fee:        ['کارمزد سرویس', 'کارمزد انتقال', 'کارمزد کارت', 'کارمزد پیامک', 'کارمزد نگهداری'],
};

const categoryFa: Record<TransactionCategory, string> = {
  purchase: 'خرید',
  transfer: 'انتقال',
  withdrawal: 'برداشت',
  deposit: 'واریز',
  fee: 'کارمزد',
};

const statusWeights: TransactionStatus[] = [
  'completed','completed','completed','completed','completed',
  'pending','pending',
  'failed',
  'refunded',
];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min: number, max: number): number { return Math.floor(Math.random() * (max - min + 1)) + min; }

function makeDate(daysAgo: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(rand(0,23), rand(0,59), 0, 0);
  return d;
}

export function generateTransactions(count = 200): Transaction[] {
  const categories: TransactionCategory[] = ['transfer','purchase','withdrawal','deposit','fee'];
  return Array.from({ length: count }, () => {
    const category = pick(categories);
    const type: TransactionType =
      category === 'deposit' ? 'credit'
      : category === 'withdrawal' || category === 'fee' ? 'debit'
      : pick(['debit','credit'] as TransactionType[]);
    const merchant = pick(merchants[category]);
    return {
      id:          'TXN' + Math.random().toString(36).substring(2,10).toUpperCase(),
      date:        makeDate(rand(0,90)),
      description: `${categoryFa[category]} – ${merchant}`,
      amount:      rand(10_000, 50_000_000),
      type,
      status:      pick(statusWeights),
      category,
      merchant,
      reference:   'REF' + Date.now().toString().slice(-8) + rand(100,999),
    };
  }).sort((a,b) => b.date.getTime() - a.date.getTime());
}

export const MOCK_TRANSACTIONS: Transaction[] = generateTransactions(200);
