import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkRLS() {
  const { data, error } = await supabase.rpc('check_rls', { table_name: 'hasil_kuis' });
  console.log("RPC Error:", error?.message);
}

checkRLS();
