-- supabase/migrations/001_create_transactions.sql


CREATE TYPE transaction_type AS ENUM ('debit', 'credit');
CREATE TYPE transaction_status AS ENUM ('completed', 'pending', 'failed', 'refunded');
CREATE TYPE transaction_category AS ENUM ('transfer', 'purchase', 'withdrawal', 'deposit', 'fee');


CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date timestamptz NOT NULL,
  description text NOT NULL,
  amount numeric NOT NULL,
  type transaction_type NOT NULL,
  status transaction_status NOT NULL,
  category transaction_category NOT NULL,
  merchant text NOT NULL,
  reference text NOT NULL,
  owner_id uuid,  -- null for demo access
  created_at timestamptz DEFAULT now()
);


ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;


-- - When Supabase Auth is added, owner_id will be required
-- - The OR owner_id IS NULL clause allows current single-user demo mode

CREATE POLICY "transactions_select" ON transactions
  FOR SELECT USING (owner_id = auth.uid() OR owner_id IS NULL);

CREATE POLICY "transactions_update" ON transactions
  FOR UPDATE USING (owner_id = auth.uid() OR owner_id IS NULL);

CREATE INDEX idx_transactions_date ON transactions (date DESC);
CREATE INDEX idx_transactions_status ON transactions (status);
CREATE INDEX idx_transactions_owner ON transactions (owner_id);
