import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY; // We only have anon key in .env usually

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  // Try to find a user id by attempting to insert with anon key and seeing if we can get auth users?
  // We can't query auth.users with anon key.
  // Can we create a temporary user?
  const email = `test_${Date.now()}@example.com`;
  const { data: authData, error: authErr } = await supabase.auth.signUp({
    email,
    password: 'password123'
  });
  
  if (authErr) {
    console.error("Auth Error:", authErr.message);
    return;
  }
  
  console.log("Created user:", authData.user?.id);
  
  if (authData.user) {
    const { data, error } = await supabase.from('hasil_kuis').insert([{
      user_id: authData.user.id,
      user_name: 'Test User',
      kuis_id: 1,
      skor: 80,
      total_benar: 4,
      total_salah: 1
    }]).select();
    
    if (error) {
      console.error("Insert Error:", error.message);
    } else {
      console.log("Insert Success:", data);
    }
  }
}

check();
