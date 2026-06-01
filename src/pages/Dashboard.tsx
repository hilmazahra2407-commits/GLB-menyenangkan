import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, MonitorPlay, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Read progress from localStorage
  const completedStepsStr = localStorage.getItem('glb_completed_steps');
  let completedSteps: number[] = [];
  if (completedStepsStr) {
    try {
      const parsed = JSON.parse(completedStepsStr);
      if (Array.isArray(parsed)) {
        completedSteps = parsed;
      } else {
        // Migration or corrupted data
        completedSteps = [];
        localStorage.removeItem('glb_completed_steps');
      }
    } catch (e) {}
  }
  const materiFinished = localStorage.getItem('glb_materi_finished') === 'true';

  return (
    <div className="flex-1 flex flex-col pt-6 pb-12 w-full">
      <div className="mb-8">
        <h1 className="text-gray-500 text-lg mb-1 font-medium">Selamat datang kembali,</h1>
        <h2 className="text-4xl font-bold text-[#c35e80]">
          {user?.user_metadata?.full_name || 'Learner'}!
        </h2>
        <p className="text-gray-600 mt-2">Belajar GLB jadi lebih mudah dan menyenangkan!</p>
      </div>

      {/* Hero Banner */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-gradient-to-r from-[#d9efff] to-[#b3e0ff] rounded-[32px] p-8 md:p-12 mb-8 relative overflow-hidden shadow-sm border-4 border-white"
      >
        <div className="relative z-10 w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
            GLB itu mudah <br />kalau paham konsepnya!
          </h2>
          <p className="text-gray-600 mb-8 max-w-sm">
            Yuk, pelajari materi Gerak Lurus Beraturan dan uji pemahamanmu lewat kuis!
          </p>
          <Link to="/materi">
            <button className="bg-[#f6b9cf] text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-[#f3a0bc] hover:-translate-y-1 transition-all flex items-center gap-2">
              Mulai Belajar <ChevronRight size={18} />
            </button>
          </Link>
        </div>
        
        {/* Decorative elements for Hero Banner */}
        <div className="absolute right-10 bottom-0 top-0 w-1/2 hidden md:flex items-center justify-center pointer-events-none">
           {/* Abstract Speedometer & Car */}
           <div className="w-full h-full relative">
              <div className="absolute top-10 right-10 bg-white/60 p-4 rounded-full backdrop-blur-sm border-2 border-white shadow-sm flex flex-col items-center">
                 <div className="text-4xl font-bold text-[#4785c4]">v = c</div>
                 <div className="text-xs font-bold text-[#c35e80] mt-1">Konstan</div>
              </div>
              <div className="absolute bottom-10 left-10 text-9xl" style={{ filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.1))' }}>
                🚗
              </div>
              {/* Speed lines */}
              <div className="absolute bottom-20 left-0 flex flex-col gap-3">
                 <div className="w-16 h-2 bg-white rounded-full"></div>
                 <div className="w-24 h-2 bg-[#93d7e2] rounded-full ml-4"></div>
                 <div className="w-12 h-2 bg-[#faf3a5] rounded-full ml-2"></div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div whileHover={{ y: -5 }} className="bg-[#eef6ff] rounded-[32px] p-6 border-4 border-white shadow-sm flex flex-col relative h-64 overflow-hidden">
          <div className="bg-white/60 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner text-[#4785c4]">
             <BookOpen size={40} />
          </div>
          <h3 className="text-2xl font-bold text-[#4785c4] mb-2">Materi</h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-[80%] relative z-10">
            Pelajari konsep GLB secara lengkap dan terstruktur.
          </p>
          <Link to="/materi" className="absolute bottom-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#4785c4] shadow hover:scale-110 transition-transform">
            <ChevronRight size={20} />
          </Link>
          <div className="absolute bottom-[-20px] left-[-20px] opacity-10 text-[#4785c4]">
            <svg width="150" height="150" viewBox="0 0 100 100"><line x1="10" y1="90" x2="90" y2="10" stroke="currentColor" strokeWidth="2"/><line x1="10" y1="10" x2="10" y2="90" stroke="currentColor" strokeWidth="2"/><line x1="10" y1="90" x2="90" y2="90" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-[#ffe4ee] rounded-[32px] p-6 border-4 border-white shadow-sm flex flex-col relative h-64 overflow-hidden">
          <div className="bg-white/60 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner text-[#c35e80]">
             <MonitorPlay size={40} />
          </div>
          <h3 className="text-2xl font-bold text-[#c35e80] mb-2">Referensi Belajar</h3>
          <p className="text-gray-600 text-sm leading-relaxed max-w-[80%] relative z-10">
            Eksplorasi GLB lebih lanjut melalui video referensi pembelajaran.
          </p>
          <Link to="/referensi" className="absolute bottom-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#c35e80] shadow hover:scale-110 transition-transform">
            <ChevronRight size={20} />
          </Link>
          <div className="absolute bottom-0 left-10 opacity-20 text-[#c35e80]">
             <svg width="100" height="50" viewBox="0 0 100 50"><path d="M0,25 Q25,0 50,25 T100,25" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="5,5" /></svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
