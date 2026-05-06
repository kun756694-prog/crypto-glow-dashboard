
-- Revoke anon execute on security definer functions
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_total_points() FROM anon;
REVOKE EXECUTE ON FUNCTION public.atomic_withdraw(text, integer, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated;

-- Add basic RLS policies on survey_results (admin-only access)
CREATE POLICY "Admins can view survey_results"
  ON public.survey_results FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert survey_results"
  ON public.survey_results FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add basic RLS policies on withdrawals (admin-only access)
CREATE POLICY "Admins can view withdrawals"
  ON public.withdrawals FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update withdrawals"
  ON public.withdrawals FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));
