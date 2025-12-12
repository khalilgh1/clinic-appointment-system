// lib/requireAdmin.js
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function requireAdmin(ctx) {
  const supabase = createServerSupabaseClient(ctx);

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Return session/user for page
  return { props: { user: session.user } };
}
