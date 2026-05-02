
CREATE TABLE public.survey_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  points INTEGER NOT NULL,
  network TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.survey_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert survey results"
  ON public.survey_results
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read survey results"
  ON public.survey_results
  FOR SELECT
  TO anon, authenticated
  USING (true);
