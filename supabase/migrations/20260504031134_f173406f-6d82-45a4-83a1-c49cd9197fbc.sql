-- Remove the open INSERT policy on withdrawals (now handled by edge function with service role)
DROP POLICY IF EXISTS "Anyone can insert withdrawals" ON public.withdrawals;

-- Remove the open INSERT policy on survey_results (should be inserted by service role only)
DROP POLICY IF EXISTS "Anyone can insert survey results" ON public.survey_results;

-- Restrict get_total_points function: revoke public/anon execute, keep for service role usage
REVOKE EXECUTE ON FUNCTION public.get_total_points() FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_total_points() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.get_total_points() FROM public;