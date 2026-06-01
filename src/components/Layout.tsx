import { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bell, User as UserIcon, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';

export const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const checkMusic = () => {
    const playMusic = localStorage.getItem('glb_play_music') === 'true';
    if (audioRef.current) {
      if (playMusic) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      checkMusic();
    }
    
    window.addEventListener('settingsChange', checkMusic);
    return () => window.removeEventListener('settingsChange', checkMusic);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isLanding = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const hideSidebar = isLanding || isAuthPage;

  return (
    <div className="min-h-screen flex bg-[#f8fbff] font-sans transition-colors duration-300 relative overflow-hidden text-gray-800">
      {/* Background decorations for landing */}
      {hideSidebar && (
        <>
          <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-100px] left-20 w-64 h-64 bg-dark rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="shape square top-[10%] left-[10%] delay-1"></div>
            <div className="shape circle top-[20%] left-[80%] delay-2"></div>
            <div className="shape triangle top-[70%] left-[15%] delay-3"></div>
            <div className="shape square top-[80%] left-[70%] delay-4"></div>
            <div className="shape circle top-[40%] left-[40%] delay-5"></div>
            <div className="shape triangle top-[50%] left-[90%] delay-1"></div>
            <div className="shape square top-[90%] left-[40%] delay-2"></div>
            <div className="shape circle top-[15%] left-[50%] delay-3"></div>
          </div>
        </>
      )}

      {/* Sidebar */}
      {!hideSidebar && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}

      {/* Audio Element */}
      <audio ref={audioRef} loop src="/assets/ost.mpeg" />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen relative transition-all duration-300 ${!hideSidebar ? 'md:ml-64' : ''}`}>
        {/* Top Header */}
        {!hideSidebar && (
          <header className="h-20 px-4 md:px-8 flex justify-between md:justify-end items-center sticky top-0 z-40 bg-[#f8fbff]/80 backdrop-blur-sm">
            <button 
              className="md:hidden p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-[#f6b9cf] hover:bg-[#fff0f5] rounded-full transition-colors">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-3 h-3 bg-[#c35e80] border-2 border-white rounded-full"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-10 h-10 bg-[#e0f0ff] rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                  <img src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=e0f0ff&color=4785c4`} alt="User avatar" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-sm text-gray-500 hover:text-red-500 font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Content */}
        <main className="flex-1 relative z-10 flex flex-col p-4 md:p-8 pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col w-full h-full max-w-7xl mx-auto"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
