import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase.from('hasil_kuis').select('*').limit(1);
  
  if (error) {
    console.error("Select Error:", error.message);
  } else {
    console.log("Data structure:", data);
  }
}

check();
