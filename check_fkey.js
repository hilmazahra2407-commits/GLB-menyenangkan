import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getFkey() {
  // We can't query pg_catalog from anon key. 
  // Let's query public.users if it exists
  const { data, error } = await supabase.from('users').select('*').limit(1);
  if (error) {
    console.log("Error querying public.users:", error.message);
  } else {
    console.log("public.users exists, data:", data);
  }
}
getFkey();
