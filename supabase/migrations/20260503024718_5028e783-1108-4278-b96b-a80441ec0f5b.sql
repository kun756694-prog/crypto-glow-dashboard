-- Remove open SELECT policies
DROP POLICY IF EXISTS "Anyone can read survey results" ON public.survey_results;
DROP POLICY IF EXISTS "Anyone can read withdrawals" ON public.withdrawals;

-- Remove open UPDATE policy on withdrawals
DROP POLICY IF EXISTS "Anyone can update withdrawals" ON public.withdrawals;

-- Create a security-definer function to get total points (bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_total_points()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(SUM(points), 0)::integer FROM public.survey_results;
$$;