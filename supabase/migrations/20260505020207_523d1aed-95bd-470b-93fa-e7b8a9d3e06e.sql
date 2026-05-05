
CREATE OR REPLACE FUNCTION public.atomic_withdraw(
  p_wallet_address text,
  p_points integer,
  p_network text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_total_earned integer;
  v_already_withdrawn integer;
  v_available integer;
  v_new_id uuid;
BEGIN
  -- Lock to serialize concurrent withdrawal attempts
  PERFORM pg_advisory_xact_lock(hashtext('withdraw_lock'));

  SELECT COALESCE(SUM(points), 0) INTO v_total_earned FROM survey_results;

  SELECT COALESCE(SUM(points), 0) INTO v_already_withdrawn
  FROM withdrawals
  WHERE status IN ('pending', 'completed');

  v_available := v_total_earned - v_already_withdrawn;

  IF p_points > v_available THEN
    RETURN jsonb_build_object('success', false, 'error', 'Insufficient balance. Available: ' || v_available || ' points.');
  END IF;

  INSERT INTO withdrawals (wallet_address, points, network)
  VALUES (p_wallet_address, p_points, p_network)
  RETURNING id INTO v_new_id;

  RETURN jsonb_build_object('success', true, 'id', v_new_id);
END;
$$;

-- Restrict to service role only
REVOKE EXECUTE ON FUNCTION public.atomic_withdraw FROM anon, authenticated, public;
