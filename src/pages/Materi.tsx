import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getMateri, type Materi as MateriType } from '../lib/api';

const Materi = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [dbMateri, setDbMateri] = useState<MateriType[]>([]);
  
  useEffect(() => {
    getMateri().then(data => setDbMateri(data));
  }, []);

  // Simulation State
  const [velocity, setVelocity] = useState(10); // m/s
  const [time, setTime] = useState(5); // s
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Check URL query parameters for step
    const searchParams = new URLSearchParams(location.search);
    const stepParam = searchParams.get('step');
    if (stepParam) {
      const parsedStep = parseInt(stepParam, 10);
      if (parsedStep >= 1 && parsedStep <= 5) {
        setCurrentStep(parsedStep);
      }
    }
  }, [location.search]);

  const updateStepInUrl = (step: number) => {
    // Record progress
    const existingStr = localStorage.getItem('glb_completed_steps');
    let completedSteps: number[] = [];
    if (existingStr) {
      try {
        const parsed = JSON.parse(existingStr);
        if (Array.isArray(parsed)) {
          completedSteps = parsed;
        } else {
          localStorage.removeItem('glb_completed_steps');
        }
      } catch(e) {}
    }
    if (!completedSteps.includes(step)) {
      completedSteps.push(step);
      localStorage.setItem('glb_completed_steps', JSON.stringify(completedSteps));
    }

    setCurrentStep(step);
    navigate(`/materi?step=${step}`, { replace: true });
  };

  const nextStep = () => {
    if (currentStep < 5) updateStepInUrl(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) updateStepInUrl(currentStep - 1);
  };

  const startSimulation = () => {
    setIsSimulating(true);
    setCurrentTime(0);
  };

  const pauseSimulation = () => {
    setIsSimulating(false);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setCurrentTime(0);
  };

  useEffect(() => {
    if (isSimulating) {
      let startTimestamp: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = (timestamp - startTimestamp) / 1000; // in seconds
        
        if (elapsed < time) {
          setCurrentTime(elapsed);
          animationRef.current = requestAnimationFrame(step);
        } else {
          setCurrentTime(time);
          setIsSimulating(false);
        }
      };
      animationRef.current = requestAnimationFrame(step);
    }
    
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isSimulating, time]);

  const carPosition = (currentTime / (time || 1)) * 100;

  // Subchapter Renderers
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.section 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#eef6ff] p-8 rounded-3xl border-4 border-white shadow-sm flex flex-col h-full justify-center"
          >
            <h2 className="text-3xl font-bold text-[#4785c4] mb-6 flex items-center gap-4">
              <span className="bg-white text-[#4785c4] w-12 h-12 rounded-full flex justify-center items-center shadow-inner">1</span>
              {dbMateri[0]?.judul || "Pengertian GLB"}
            </h2>
            <p className="text-xl leading-relaxed text-gray-700 bg-white/60 p-6 rounded-2xl shadow-inner">
              {dbMateri[0]?.deskripsi || "Gerak lurus beraturan adalah gerak suatu benda pada lintasan lurus dengan kecepatan konstan, yang berarti kecepatannya tidak berubah setiap waktu. Karena kecepatannya konstan, maka benda yang mengalami GLB percepatannya nol."}
            </p>
          </motion.section>
        );
      case 2:
        return (
          <motion.section 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#fff9d6] p-8 rounded-3xl border-4 border-white shadow-sm flex flex-col h-full justify-center"
          >
            <h2 className="text-3xl font-bold text-[#d4af37] mb-6 flex items-center gap-4">
              <span className="bg-white text-[#d4af37] w-12 h-12 rounded-full flex justify-center items-center shadow-inner">2</span>
              Besaran Penting
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <h3 className="font-bold text-[#d4af37] text-2xl mb-2">Jarak (s)</h3>
                <p className="text-gray-600">Panjang lintasan yang ditempuh oleh suatu benda.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <h3 className="font-bold text-[#d4af37] text-2xl mb-2">Waktu (t)</h3>
                <p className="text-gray-600">Selang waktu yang diperlukan benda untuk menempuh jarak tertentu.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                <h3 className="font-bold text-[#d4af37] text-2xl mb-2">Kecepatan (v)</h3>
                <p className="text-gray-600">Perbandingan antara jarak tempuh dengan waktu yang diperlukan.</p>
              </div>
            </div>
          </motion.section>
        );
      case 3:
        return (
          <motion.section 
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#e0f0ff] p-8 rounded-3xl border-4 border-white shadow-sm flex flex-col h-full justify-center items-center text-center"
          >
            <h2 className="text-3xl font-bold text-[#4785c4] mb-8 flex items-center gap-4 self-start">
              <span className="bg-white text-[#4785c4] w-12 h-12 rounded-full flex justify-center items-center shadow-inner">3</span>
              Persamaan Dasar
            </h2>
            
            <div className="flex items-center justify-center w-64 h-32 bg-white rounded-3xl shadow-inner text-6xl font-bubblegum text-[#c35e80] my-6 border-4 border-[#fff0f5]">
              v = s / t
            </div>
            
            <div className="bg-white/60 p-6 rounded-2xl w-full max-w-md shadow-sm">
              <ul className="text-lg font-medium text-left space-y-3 text-gray-700">
                <li className="flex items-center gap-3"><span className="w-8 h-8 bg-[#f6b9cf] text-white rounded-full flex items-center justify-center font-bold">s</span> Jarak (meter)</li>
                <li className="flex items-center gap-3"><span className="w-8 h-8 bg-[#93d7e2] text-white rounded-full flex items-center justify-center font-bold">v</span> Kecepatan (m/s)</li>
                <li className="flex items-center gap-3"><span className="w-8 h-8 bg-[#faf3a5] text-gray-700 rounded-full flex items-center justify-center font-bold">t</span> Waktu (sekon)</li>
              </ul>
            </div>
          </motion.section>
        );
      case 4:
        return (
          <motion.section 
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#fff0f5] p-8 rounded-3xl border-4 border-white shadow-sm flex flex-col h-full"
          >
            <h2 className="text-3xl font-bold text-[#c35e80] mb-6 flex items-center gap-4">
              <span className="bg-white text-[#c35e80] w-12 h-12 rounded-full flex justify-center items-center shadow-inner">4</span>
              Grafik GLB
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col">
                <h3 className="font-bold text-[#c35e80] text-xl mb-4 text-center">Grafik Jarak (s) terhadap Waktu (t)</h3>
                <div className="flex-1 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                  <img 
                    src="/assets/grafik%20s%20t.jpeg" 
                    alt="Grafik s-t" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-600 text-center font-medium">Berupa garis linear miring ke atas.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col">
                <h3 className="font-bold text-[#c35e80] text-xl mb-4 text-center">Grafik Kecepatan (v) terhadap Waktu (t)</h3>
                <div className="flex-1 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center">
                  <img 
                    src="/assets/grafik%20v%20t.jpeg" 
                    alt="Grafik v-t" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="mt-4 text-sm text-gray-600 text-center font-medium">Berupa garis lurus mendatar sejajar sumbu t.</p>
              </div>
            </div>
          </motion.section>
        );
      case 5:
        return (
          <motion.section 
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#f8fbff] flex flex-col h-full space-y-8"
          >
            {/* Theory */}
            <div className="bg-[#eef6ff] p-8 rounded-3xl border-4 border-white shadow-sm">
              <h2 className="text-3xl font-bold text-[#4785c4] mb-6 flex items-center gap-4">
                <span className="bg-white text-[#4785c4] w-12 h-12 rounded-full flex justify-center items-center shadow-inner">5</span>
                Penerapan & Contoh Soal
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-xl mb-4 text-[#4785c4]">Dalam Kehidupan Sehari-hari</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-3">
                    <li>Mobil melaju di jalan tol dengan kecepatan tetap.</li>
                    <li>Kereta api bergerak di rel lurus dengan kecepatan konstan.</li>
                    <li>Sepeda motor melaju lurus tanpa menambah atau mengurangi gas.</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-xl mb-4 text-[#4785c4]">Contoh Soal</h3>
                  <p className="text-gray-700 italic mb-4 bg-gray-50 p-4 rounded-xl border-l-4 border-[#4785c4]">
                    "Sebuah mobil melaju di jalan lurus menempuh jarak 300 meter dalam waktu 15 sekon. Berapa kecepatannya?"
                  </p>
                  <div className="bg-[#e0f0ff] p-4 rounded-xl text-gray-800">
                    <p><span className="font-bold text-[#4785c4]">Diketahui:</span> s = 300 m, t = 15 s</p>
                    <p><span className="font-bold text-[#4785c4]">Jawab:</span> v = s / t</p>
                    <p className="ml-14 font-bold text-lg mt-2">v = 300 / 15 = <span className="text-[#c35e80]">20 m/s</span></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Simulation (Moved to Subchapter 5) */}
            <div className="bg-white p-8 rounded-3xl border-4 border-[#e0f0ff] shadow-sm">
              <h2 className="text-3xl font-bubblegum text-center text-[#c35e80] mb-8">Simulasi GLB</h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Controls */}
                <div className="flex-1 space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex justify-between">
                      <span>Kecepatan (v)</span> 
                      <span className="text-[#c35e80]">{velocity} m/s</span>
                    </label>
                    <input 
                      type="range" 
                      min="1" max="50" 
                      value={velocity} 
                      onChange={(e) => { setVelocity(Number(e.target.value)); resetSimulation(); }}
                      disabled={isSimulating}
                      className="w-full accent-[#c35e80]"
                    />
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex justify-between">
                      <span>Waktu (t)</span>
                      <span className="text-[#4785c4]">{time} s</span>
                    </label>
                    <input 
                      type="range" 
                      min="1" max="20" 
                      value={time} 
                      onChange={(e) => { setTime(Number(e.target.value)); resetSimulation(); }}
                      disabled={isSimulating}
                      className="w-full accent-[#4785c4]"
                    />
                  </div>
                  
                  <div className="pt-2 flex gap-3">
                    <button 
                      onClick={startSimulation} 
                      disabled={isSimulating || currentTime >= time}
                      className="flex-1 py-4 bg-[#f6b9cf] text-white font-bold rounded-2xl hover:bg-[#f3a0bc] transition-all disabled:opacity-50 disabled:hover:translate-y-0 hover:-translate-y-1 shadow-md flex justify-center items-center gap-2"
                    >
                      <Play size={20} /> Mulai
                    </button>
                    <button 
                      onClick={pauseSimulation} 
                      disabled={!isSimulating}
                      className="flex-1 py-4 bg-[#faf3a5] text-gray-800 font-bold rounded-2xl hover:bg-[#f2e67a] transition-all disabled:opacity-50 disabled:hover:translate-y-0 hover:-translate-y-1 shadow-md flex justify-center items-center gap-2"
                    >
                      <Square size={20} /> Pause
                    </button>
                    <button 
                      onClick={resetSimulation}
                      className="flex-1 py-4 bg-gray-200 text-gray-800 font-bold rounded-2xl hover:bg-gray-300 transition-all hover:-translate-y-1 shadow-md flex justify-center items-center gap-2"
                    >
                      <RotateCcw size={20} /> Reset
                    </button>
                  </div>
                </div>

                {/* Results Panel */}
                <div className="w-full md:w-72 bg-[#eef6ff] p-8 rounded-3xl shadow-inner flex flex-col justify-center items-center border-2 border-white">
                  <div className="bg-white w-full py-4 rounded-2xl shadow-sm mb-6 flex flex-col items-center">
                    <span className="text-gray-500 font-bold text-xs uppercase tracking-wider">Jarak Tempuh (s)</span>
                    <span className="text-5xl font-bubblegum text-[#c35e80] mt-2">{(velocity * (currentTime || (isSimulating ? 0 : time))).toFixed(1)} <span className="text-2xl">m</span></span>
                  </div>
                  
                  <div className="w-full flex justify-between items-center bg-white px-6 py-4 rounded-2xl shadow-sm">
                    <span className="text-gray-500 font-bold text-xs uppercase tracking-wider">WAKTU</span>
                    <div className="text-2xl font-bold text-[#4785c4]">{currentTime.toFixed(1)}s</div>
                  </div>
                </div>
              </div>

              {/* Animation Canvas */}
              <div className="mt-8 relative w-full h-40 bg-gradient-to-b from-[#e0f0ff] to-[#b3e0ff] rounded-2xl overflow-hidden border-4 border-white shadow-sm">
                {/* Road */}
                <div className="absolute bottom-0 w-full h-16 bg-[#a0aab5]">
                   {/* Dashed line */}
                   <div className="w-full h-2 bg-transparent border-t-4 border-dashed border-white mt-7"></div>
                </div>
                
                {/* Background Decor (Clouds) */}
                <div className="absolute top-4 left-10 text-white opacity-80"><svg width="40" height="20" viewBox="0 0 40 20" fill="currentColor"><path d="M10,20 Q0,20 0,10 Q0,0 10,0 Q15,0 20,5 Q25,0 30,0 Q40,0 40,10 Q40,20 30,20 Z"/></svg></div>
                <div className="absolute top-2 right-20 text-white opacity-60 scale-75"><svg width="40" height="20" viewBox="0 0 40 20" fill="currentColor"><path d="M10,20 Q0,20 0,10 Q0,0 10,0 Q15,0 20,5 Q25,0 30,0 Q40,0 40,10 Q40,20 30,20 Z"/></svg></div>

                {/* Car */}
                <motion.div 
                  className="absolute bottom-6 w-16 h-10 flex items-end justify-center"
                  style={{ left: `calc(${carPosition}% - ${carPosition > 0 ? '4rem' : '0rem'})` }}
                >
                  <div className="text-6xl" style={{ transform: 'scaleX(-1)', filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.2))' }}>🚗</div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-6 pb-20 w-full max-w-5xl mx-auto h-[calc(100vh-100px)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bubblegum text-gray-800">Materi GLB</h1>
          <p className="text-gray-500 font-medium">Langkah {currentStep} dari 5</p>
        </div>
        
        {/* Progress indicator */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step} 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentStep === step ? 'bg-[#c35e80] scale-125' : 
                currentStep > step ? 'bg-[#f6b9cf]' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 min-h-[400px] overflow-y-auto mb-6 relative">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-auto bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <button 
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={20} /> Sebelumnya
        </button>
        
        {currentStep < 5 ? (
          <button 
            onClick={nextStep}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-[#93d7e2] text-white hover:bg-[#7bc8d5] hover:-translate-y-1 transition-all"
          >
            Selanjutnya <ChevronRight size={20} />
          </button>
        ) : (
          <button 
            onClick={() => {
              localStorage.setItem('glb_materi_finished', 'true');
              navigate('/kuis');
            }}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-[#f6b9cf] text-white hover:bg-[#f3a0bc] hover:-translate-y-1 transition-all"
          >
            Selesai & Lanjut Kuis <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Materi;
