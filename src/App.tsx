import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';

// Pages (to be created)
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Materi from './pages/Materi';
import Kuis from './pages/Kuis';
import ChatAI from './pages/ChatAI';
import Leaderboard from './pages/Leaderboard';
import TentangKami from './pages/TentangKami';
import Pengaturan from './pages/Pengaturan';
import Referensi from './pages/Referensi';
import Riwayat from './pages/Riwayat';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            
            {/* Protected Routes */}
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="materi" element={
              <ProtectedRoute>
                <Materi />
              </ProtectedRoute>
            } />
            <Route path="kuis" element={
              <ProtectedRoute>
                <Kuis />
              </ProtectedRoute>
            } />
            <Route path="chat-ai" element={
              <ProtectedRoute>
                <ChatAI />
              </ProtectedRoute>
            } />
            <Route path="leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            <Route path="riwayat" element={
              <ProtectedRoute>
                <Riwayat />
              </ProtectedRoute>
            } />
            <Route path="referensi" element={
              <ProtectedRoute>
                <Referensi />
              </ProtectedRoute>
            } />
            <Route path="tentang-kami" element={
              <ProtectedRoute>
                <TentangKami />
              </ProtectedRoute>
            } />
            <Route path="pengaturan" element={
              <ProtectedRoute>
                <Pengaturan />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
