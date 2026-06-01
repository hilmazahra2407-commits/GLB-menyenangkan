import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUserHasilKuis } from '../lib/api';
import { Clock, Calendar, CheckCircle, XCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const Riwayat = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getUserHasilKuis(user.id).then(data => {
        setHistory(data || []);
        setLoading(false);
      });
    }
  }, [user]);

  if (loading) {
    return <div className="flex-1 flex justify-center items-center text-gray-500 font-bold">Memuat Riwayat...</div>;
  }

  return (
    <div className="flex-1 flex flex-col pt-6 pb-20 w-full max-w-4xl mx-auto min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bubblegum text-gray-800">Riwayat Kuis</h1>
        <p className="text-gray-500 font-medium">Lihat kembali pencapaian dan skor kuis yang telah kamu kerjakan.</p>
      </div>

      {history.length === 0 ? (
        <div className="bg-white p-8 rounded-3xl border-4 border-gray-100 shadow-sm text-center">
          <Clock size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-600">Belum ada riwayat kuis</h2>
          <p className="text-gray-500">Ayo selesaikan materi dan kerjakan kuisnya!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item, index) => (
            <motion.div 
              key={item.id || index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl border-2 border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="bg-[#eef6ff] p-3 rounded-xl text-[#4785c4]">
                  <Award size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.kuis?.judul || 'Kuis GLB'}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(item.waktu_pengerjaan).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-6 items-center bg-gray-50 p-3 rounded-xl w-full md:w-auto">
                <div className="text-center">
                  <div className="text-xs text-gray-500 font-bold mb-1">SKOR</div>
                  <div className={`text-2xl font-bold ${item.skor >= 70 ? 'text-green-500' : 'text-orange-500'}`}>
                    {Math.round(item.skor)}
                  </div>
                </div>
                <div className="h-10 w-px bg-gray-200"></div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-green-600 font-bold">
                    <CheckCircle size={16} /> {item.total_benar}
                  </div>
                  <div className="flex items-center gap-1 text-red-500 font-bold">
                    <XCircle size={16} /> {item.total_salah}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Riwayat;
