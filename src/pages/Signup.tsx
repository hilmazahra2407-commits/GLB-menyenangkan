import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MailCheck } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) {
      setLoading(true);
      setError('');
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          },
          emailRedirectTo: 'https://glb-menyenangkan.vercel.app/'
        }
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Insert into our custom users table
      if (data.user) {
        const { error: insertError } = await supabase.from('users').insert({
          id: data.user.id,
          nama: name,
          email: email,
          password: 'supabase-auth' // Dummy password to satisfy NOT NULL constraint
        });
        
        if (insertError) {
          console.error("Error creating user profile:", insertError);
        }
      }

      setLoading(false);
      
      if (!data.session) {
        setShowVerification(true);
      } else {
        navigate('/dashboard');
      }
    }
  };

  if (showVerification) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border-4 border-accent text-center relative overflow-hidden">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border-4 border-white">
            <MailCheck size={40} />
          </div>
          <h2 className="text-3xl font-bubblegum text-dark mb-4">Cek Email Anda!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Tautan konfirmasi telah dikirim ke <strong className="text-gray-800">{email}</strong>. 
            <br/><br/>
            Silakan buka email Anda dan klik tautan tersebut untuk memverifikasi akun sebelum login.
          </p>
          <Link to="/login">
            <button className="w-full py-4 bg-primary text-gray-800 font-bold rounded-xl shadow-md hover:bg-[#7bc8d5] hover:shadow-lg transition-all hover:-translate-y-1">
              Kembali ke Halaman Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border-4 border-accent relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-primary rounded-full opacity-50"></div>
        
        <h2 className="text-3xl font-bubblegum text-center mb-6 text-dark relative z-10">Sign Up</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
              placeholder="Masukkan namamu..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
              placeholder="contoh@sekolah.com"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
              placeholder="Minimal 6 karakter"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full py-4 bg-dark text-white font-bold rounded-xl shadow-lg hover:bg-[#a64d6b] hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Sudah punya akun? <Link to="/login" className="text-dark font-bold hover:underline">Login di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
