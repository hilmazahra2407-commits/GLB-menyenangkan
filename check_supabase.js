import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase.from('pertanyaan_kuis').select('*');
  if (error) {
    console.error("Error fetching:", error);
  } else {
    console.log("Pertanyaan Kuis Count:", data.length);
    console.log(data);
  }
}

check();
