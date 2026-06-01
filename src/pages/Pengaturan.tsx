import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

const Pengaturan = () => {
  const [playMusic, setPlayMusic] = useState(() => {
    return localStorage.getItem('glb_play_music') === 'true';
  });
  
  const [playSfx, setPlaySfx] = useState(() => {
    return localStorage.getItem('glb_play_sfx') !== 'false'; // Default true
  });

  const handleToggleMusic = () => {
    const newVal = !playMusic;
    setPlayMusic(newVal);
    localStorage.setItem('glb_play_music', newVal.toString());
    window.dispatchEvent(new Event('settingsChange'));
  };

  const handleToggleSfx = () => {
    const newVal = !playSfx;
    setPlaySfx(newVal);
    localStorage.setItem('glb_play_sfx', newVal.toString());
  };

  return (
    <div className="flex-1 flex flex-col pt-6 pb-20 w-full max-w-4xl mx-auto h-[calc(100vh-100px)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bubblegum text-gray-800">Pengaturan</h1>
        <p className="text-gray-500 font-medium">Sesuaikan preferensi aplikasimu.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl border-4 border-gray-100 shadow-sm"
      >
        <div className="flex flex-col gap-6">
          
          {/* Audio Settings */}
          <div className="bg-[#eef6ff] p-6 rounded-2xl border-2 border-white shadow-inner flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white text-[#4785c4] p-3 rounded-full shadow-sm">
                <Music size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Musik Latar</h3>
                <p className="text-gray-600 text-sm">Aktifkan musik agar belajarmu lebih menyenangkan</p>
              </div>
            </div>
            
            <button 
              onClick={handleToggleMusic}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${playMusic ? 'bg-[#4785c4]' : 'bg-gray-300'}`}
            >
              <span className="sr-only">Toggle music</span>
              <span 
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${playMusic ? 'translate-x-7' : 'translate-x-1'}`} 
              />
            </button>
          </div>

          {/* SFX Settings */}
          <div className="bg-[#fff9d6] p-6 rounded-2xl border-2 border-white shadow-inner flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-white text-[#d4af37] p-3 rounded-full shadow-sm text-2xl">
                🔊
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Efek Suara (Kuis)</h3>
                <p className="text-gray-600 text-sm">Mainkan efek suara saat menjawab soal kuis</p>
              </div>
            </div>
            
            <button 
              onClick={handleToggleSfx}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${playSfx ? 'bg-[#d4af37]' : 'bg-gray-300'}`}
            >
              <span className="sr-only">Toggle SFX</span>
              <span 
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${playSfx ? 'translate-x-7' : 'translate-x-1'}`} 
              />
            </button>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default Pengaturan;
