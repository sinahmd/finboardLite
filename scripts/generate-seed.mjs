// scripts/generate-seed.mjs
// Run: node scripts/generate-seed.mjs > supabase/migrations/002_seed_transactions.sql

const merchants = {
  purchase:   ['دیجی‌کالا', 'اسنپ‌فود', 'بامیلو', 'کافه‌بازار', 'تپسی', 'دیوار', 'توربو'],
  transfer:   ['بانک ملت', 'بانک ملی', 'بانک پارسیان', 'بانک تجارت', 'بانک صادرات'],
  withdrawal: ['خودپرداز ونک', 'خودپرداز تجریش', 'خودپرداز آزادی', 'خودپرداز انقلاب', 'خودپرداز فردوسی'],
  deposit:    ['حقوق', 'درآمد فریلنسری', 'بازپرداخت', 'سود سپرده', 'پاداش'],
  fee:        ['کارمزد سرویس', 'کارمزد انتقال', 'کارمزد کارت', 'کارمزد پیامک', 'کارمزد نگهداری'],
};

const categoryFa = {
  purchase: 'خرید',
  transfer: 'انتقال',
  withdrawal: 'برداشت',
  deposit: 'واریز',
  fee: 'کارمزد',
};

const statusWeights = [
  'completed','completed','completed','completed','completed',
  'pending','pending',
  'failed',
  'refunded',
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function makeDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(rand(0,23), rand(0,59), 0, 0);
  return d;
}

function esc(s) {
  return s.replace(/'/g, "''");
}

function generateTransactions(count = 200) {
  const categories = ['transfer','purchase','withdrawal','deposit','fee'];
  return Array.from({ length: count }, () => {
    const category = pick(categories);
    const type =
      category === 'deposit' ? 'credit'
      : category === 'withdrawal' || category === 'fee' ? 'debit'
      : pick(['debit','credit']);
    const merchant = pick(merchants[category]);
    return {
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

const txns = generateTransactions(200);

const lines = txns.map(t => {
  const date = t.date.toISOString();
  const desc = esc(t.description);
  const merchant = esc(t.merchant);
  const ref = esc(t.reference);
  return `('${date}', '${desc}', ${t.amount}, '${t.type}', '${t.status}', '${t.category}', '${merchant}', '${ref}')`;
});

const sql = `-- supabase/migrations/002_seed_transactions.sql
-- Seed 200 mock transactions for demo data
-- id column excluded from INSERT — gen_random_uuid() handles it
-- Run this after 001_create_transactions.sql

INSERT INTO transactions (date, description, amount, type, status, category, merchant, reference) VALUES
${lines.join(',\n')};
`;

process.stdout.write(sql, 'utf8');
