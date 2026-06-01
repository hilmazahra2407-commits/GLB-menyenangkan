import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase.from('hasil_kuis').insert([{
    user_id: '00000000-0000-0000-0000-000000000000',
    user_name: 'Test',
    kuis_id: 1,
    skor: 100,
    total_benar: 5,
    total_salah: 0
  }]);
  
  if (error) {
    console.error("Insert Error:", error.message);
  } else {
    console.log("Insert Success!");
  }
}

check();
