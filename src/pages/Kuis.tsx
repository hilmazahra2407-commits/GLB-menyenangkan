import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { getPertanyaanKuis, saveHasilKuis, type PertanyaanKuis } from '../lib/api';

const Kuis = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<PertanyaanKuis[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [uniqueCode, setUniqueCode] = useState("");
  
  const [score, setScore] = useState(0);
  const [totalBenar, setTotalBenar] = useState(0);
  const [totalSalah, setTotalSalah] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [audio] = useState(new Audio('/assets/success.mp3'));

  const materiFinished = localStorage.getItem('glb_materi_finished') === 'true';

  useEffect(() => {
    if (materiFinished) {
      getPertanyaanKuis(1).then(data => {
        setQuestions(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [materiFinished]);

  const handleNext = async () => {
    const currentQ = questions[currentQIndex];
    const optionMap = ['A', 'B', 'C', 'D'];
    const selectedLetter = optionMap[selectedOption!];
    
    let isCorrect = false;
    const requiredCode = currentQ.kode_unik || "";

    if (selectedLetter === currentQ.jawaban_benar && uniqueCode === requiredCode) {
      isCorrect = true;
      const questionWeight = 100 / questions.length;
      setScore(prev => prev + questionWeight);
      setTotalBenar(prev => prev + 1);
    } else {
      setTotalSalah(prev => prev + 1);
    }
    
    // Play sound on every submit (not just correct)
    const playAudio = localStorage.getItem('glb_play_sfx') !== 'false';
    if (playAudio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log("Audio play prevented:", e));
    }

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setUniqueCode("");
    } else {
      const questionWeight = 100 / questions.length;
      const finalScore = isCorrect ? score + questionWeight : score;
      const finalBenar = isCorrect ? totalBenar + 1 : totalBenar;
      const finalSalah = !isCorrect ? totalSalah + 1 : totalSalah;
      await finishQuiz(finalScore, finalBenar, finalSalah);
    }
  };

  const finishQuiz = async (finalScore: number, finalBenar: number, finalSalah: number) => {
    setSaving(true);
    setScore(finalScore);
    
    if (user) {
      try {
        await saveHasilKuis({
          user_id: user.id,
          user_name: user.user_metadata?.full_name || 'Anonim',
          kuis_id: 1, // default kuis 1
          skor: finalScore,
          total_benar: finalBenar,
          total_salah: finalSalah
        });
      } catch (e: any) {
        console.error("Gagal menyimpan hasil kuis", e);
        alert("Maaf, terjadi kesalahan saat menyimpan skor Anda: " + (e.message || "Pastikan tabel hasil_kuis sudah diperbarui di database."));
      } finally {
        setSaving(false);
        setIsFinished(true);
      }
    } else {
      setSaving(false);
      setIsFinished(true);
    }
  };

  if (loading) {
    return <div className="flex-1 flex justify-center items-center text-xl text-gray-500 font-bold">Memuat Kuis...</div>;
  }

  if (!materiFinished) {
    return (
      <div className="flex-1 flex justify-center items-center pb-20">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center border-4 border-yellow-300">
          <div className="flex justify-center mb-4 text-yellow-500"><AlertCircle size={64} /></div>
          <h2 className="text-3xl font-bubblegum mb-2 text-dark">Kuis Terkunci!</h2>
          <p className="text-gray-600 mb-8">Selesaikan semua materi dari awal sampai akhir terlebih dahulu untuk membuka Kuis.</p>
          <button 
            onClick={() => navigate('/materi')}
            className="w-full py-4 bg-primary text-gray-800 font-bold rounded-xl hover:bg-[#7bc8d5] transition-all shadow-md"
          >
            Lanjut Belajar Materi
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex-1 flex justify-center items-center pb-20">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center border-4 border-gray-200">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Kuis Belum Tersedia</h2>
          <p className="text-gray-500">Soal kuis belum ditambahkan ke database.</p>
        </div>
      </div>
    );
  }

  if (saving) {
    return <div className="flex-1 flex justify-center items-center text-xl font-bold text-[#c35e80]">Menyimpan nilai...</div>;
  }

  if (isFinished) {
    const isPassed = score >= 70;
    return (
      <div className="flex-1 flex justify-center items-center pb-20">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center border-4 border-primary">
          <h2 className="text-4xl font-bubblegum mb-4 text-dark">Kuis Selesai!</h2>
          
          <div className="text-6xl font-bold mb-6 text-gray-800">
            {Math.round(score)} <span className="text-2xl text-gray-500">/ 100</span>
          </div>

          {isPassed ? (
            <div className="mb-8">
              <div className="flex justify-center mb-4 text-green-500"><CheckCircle size={64} /></div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Luar Biasa, {user?.user_metadata?.full_name || 'Siswa'}! 🎉</h3>
              <p className="text-gray-600">Kamu telah menguasai materi GLB dengan baik.</p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="mt-6 w-full py-4 bg-primary text-gray-800 font-bold rounded-xl hover:bg-[#7bc8d5] transition-all shadow-md"
              >
                Kembali ke Dashboard
              </button>
            </div>
          ) : (
            <div className="mb-8">
              <div className="flex justify-center mb-4 text-orange-500"><AlertCircle size={64} /></div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Tetap Semangat, {user?.user_metadata?.full_name || 'Siswa'}! 💪</h3>
              <p className="text-gray-600">Nilaimu masih di bawah KKM (70). Yuk, kita pelajari lagi materinya biar makin paham!</p>
              <button 
                onClick={() => navigate('/materi')}
                className="mt-6 w-full py-4 bg-accent text-dark font-bold rounded-xl hover:bg-[#eb9ab5] transition-all shadow-md"
              >
                Belajar Lagi
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQIndex];
  const optionsList = [currentQ.opsi_a, currentQ.opsi_b, currentQ.opsi_c, currentQ.opsi_d];

  return (
    <div className="flex-1 flex justify-center items-start pt-10 pb-20">
      <div className="w-full max-w-3xl bg-white p-6 md:p-10 rounded-3xl shadow-xl border-4 border-gray-200">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Soal {currentQIndex + 1} dari {questions.length}</span>
              {currentQ.level_title && (
                <span className="px-3 py-1 bg-[#fff0f5] text-[#c35e80] text-xs font-bold rounded-full">{currentQ.level_title}</span>
              )}
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-[#f8fbff] p-6 rounded-2xl border-2 border-[#e0f0ff] mb-8 shadow-inner">
          <h3 className="text-xl font-medium text-gray-800 leading-relaxed whitespace-pre-line">
            {currentQ.pertanyaan}
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {optionsList.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedOption(idx)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedOption === idx 
                  ? 'border-primary bg-primary/10 font-bold shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="inline-block w-8 h-8 bg-white border border-gray-200 rounded-full text-center leading-8 mr-3">
                {String.fromCharCode(65 + idx)}
              </span>
              {opt}
            </button>
          ))}
        </div>

        {/* Unique Code Input */}
        <div className="bg-secondary/30 p-6 rounded-2xl border-2 border-secondary mb-8">
          <label className="block text-sm font-bold text-gray-800 mb-3">
            🔑 Masukkan Kode Unik
          </label>
          <input 
            type="text" 
            value={uniqueCode}
            onChange={(e) => setUniqueCode(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-dark focus:outline-none transition-colors"
            placeholder="Ketik kode unik di sini..."
            maxLength={2}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end">
          <button 
            onClick={handleNext}
            disabled={selectedOption === null || uniqueCode === ""}
            className="px-8 py-4 bg-dark text-white font-bold rounded-xl hover:bg-[#a64d6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {currentQIndex === questions.length - 1 ? 'Selesai & Simpan Nilai' : 'Lanjut ke Soal Berikutnya'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Kuis;

