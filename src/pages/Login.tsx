import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setLoading(true);
      setError('');
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);
      
      if (error) {
        setError(error.message);
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border-4 border-primary relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-[-20px] left-[-20px] w-20 h-20 bg-accent rounded-full opacity-50"></div>
        
        <h2 className="text-3xl font-bubblegum text-center mb-6 text-dark relative z-10">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
              placeholder="Email kamu"
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
              placeholder="Password kamu"
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="mt-4 w-full py-4 bg-primary text-gray-800 font-bold rounded-xl shadow-lg hover:bg-[#7bc8d5] hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
        <p className="mt-6 text-center text-gray-600">
          Belum punya akun? <Link to="/signup" className="text-primary font-bold hover:underline">Daftar dulu</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
