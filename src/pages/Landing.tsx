import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Brain, Trophy } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="max-w-3xl"
      >
        <div className="mb-8 inline-block p-4 rounded-full bg-white/50 backdrop-blur shadow-xl">
          <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 font-bubblegum tracking-wide">
          GLB <span className="text-dark">Menyenangkan</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed font-medium">
          Belajar Fisika (Gerak Lurus Beraturan) jadi lebih asik, interaktif, dan mudah dipahami dengan simulasi dan AI!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/login">
            <button className="px-8 py-4 bg-primary text-gray-800 font-bold rounded-full shadow-lg hover:bg-[#7bc8d5] hover:scale-105 transition-all flex items-center gap-2 text-lg border-2 border-white/50">
              Mulai Belajar <ArrowRight size={20} />
            </button>
          </Link>
          <Link to="/signup">
            <button className="px-8 py-4 bg-white text-dark font-bold rounded-full shadow-lg hover:bg-gray-50 hover:scale-105 transition-all text-lg">
              Sign Up
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Features showcase */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow border border-white/40 flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-4 text-orange-500">
            <BookOpen size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Materi Interaktif</h3>
          <p className="text-gray-600">Simulasi gerak langsung di halaman materi untuk pemahaman maksimal.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow border border-white/40 flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4 text-dark">
            <Brain size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Tanya Jawab AI</h3>
          <p className="text-gray-600">Tanya apapun tentang GLB kapanpun kamu bingung.</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow border border-white/40 flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center mb-4 text-teal-600">
            <Trophy size={24} />
          </div>
          <h3 className="text-xl font-bold mb-2">Kuis & Leaderboard</h3>
          <p className="text-gray-600">Uji pemahamanmu dan raih peringkat teratas di kelas!</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
