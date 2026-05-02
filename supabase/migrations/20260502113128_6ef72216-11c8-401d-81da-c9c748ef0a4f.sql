
CREATE TABLE public.withdrawals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  network TEXT NOT NULL,
  points INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert withdrawals"
  ON public.withdrawals FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read withdrawals"
  ON public.withdrawals FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update withdrawals"
  ON public.withdrawals FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);
