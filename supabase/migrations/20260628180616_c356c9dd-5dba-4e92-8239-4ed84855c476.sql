
-- 1. Create private schema not exposed via PostgREST
CREATE SCHEMA IF NOT EXISTS private;

-- 2. Recreate has_role in private schema (used only by RLS policies)
CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

-- 3. Recreate all RLS policies that referenced public.has_role to use private.has_role
-- profiles
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- user_roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- survey_results
DROP POLICY IF EXISTS "Admins can insert survey_results" ON public.survey_results;
DROP POLICY IF EXISTS "Admins can view survey_results" ON public.survey_results;
CREATE POLICY "Admins can insert survey_results" ON public.survey_results
  FOR INSERT TO authenticated WITH CHECK (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can view survey_results" ON public.survey_results
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- withdrawals
DROP POLICY IF EXISTS "Admins can update withdrawals" ON public.withdrawals;
DROP POLICY IF EXISTS "Admins can view withdrawals" ON public.withdrawals;
CREATE POLICY "Admins can update withdrawals" ON public.withdrawals
  FOR UPDATE TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can view withdrawals" ON public.withdrawals
  FOR SELECT TO authenticated USING (private.has_role(auth.uid(), 'admin'::public.app_role));

-- 4. Drop the public.has_role function — no longer exposed via API
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);

-- 5. Lock down remaining public SECURITY DEFINER functions
-- These are only called by trigger (handle_new_user) or by edge functions running as service_role.
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_total_points() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.atomic_withdraw(text, integer, text) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
GRANT EXECUTE ON FUNCTION public.get_total_points() TO service_role;
GRANT EXECUTE ON FUNCTION public.atomic_withdraw(text, integer, text) TO service_role;
