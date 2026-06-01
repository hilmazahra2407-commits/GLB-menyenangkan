import { useState, useEffect } from 'react';
import { getLeaderboard } from '../lib/api';
import { Award, Medal, Trophy, User } from 'lucide-react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard().then(data => {
      setLeaders(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="flex-1 flex justify-center items-center text-gray-500 font-bold">Memuat Klasemen...</div>;
  }

  return (
    <div className="flex-1 flex flex-col pt-6 pb-20 w-full max-w-4xl mx-auto min-h-screen">
      <div className="mb-8 text-center">
        <Trophy size={64} className="mx-auto text-yellow-500 mb-4 drop-shadow-md" />
        <h1 className="text-4xl font-bubblegum text-gray-800">Leaderboard</h1>
        <p className="text-gray-500 font-medium">Top 10 siswa dengan nilai Kuis GLB terbaik!</p>
      </div>

      {leaders.length === 0 ? (
        <div className="bg-white p-8 rounded-3xl border-4 border-gray-100 shadow-sm text-center">
          <h2 className="text-xl font-bold text-gray-600">Belum ada data</h2>
          <p className="text-gray-500">Jadilah yang pertama menyelesaikan kuis dan cetak namamu di sini!</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border-4 border-yellow-200 shadow-md overflow-hidden">
          <div className="bg-yellow-50 px-6 py-4 border-b-2 border-yellow-100 grid grid-cols-12 gap-4 font-bold text-gray-600">
            <div className="col-span-2 md:col-span-1 text-center">Rank</div>
            <div className="col-span-6 md:col-span-7">Nama Siswa</div>
            <div className="col-span-4 md:col-span-4 text-right">Skor</div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {leaders.map((item, index) => {
              let rankColor = "text-gray-500";
              let bgRow = "bg-white";
              
              if (index === 0) { rankColor = "text-yellow-500"; bgRow = "bg-yellow-50/30"; }
              else if (index === 1) { rankColor = "text-gray-400"; bgRow = "bg-gray-50/50"; }
              else if (index === 2) { rankColor = "text-amber-700"; bgRow = "bg-orange-50/30"; }

              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${bgRow} px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors`}
                >
                  <div className={`col-span-2 md:col-span-1 text-center font-bold text-xl flex justify-center items-center ${rankColor}`}>
                    {index === 0 ? <Medal size={28} /> : index === 1 ? <Medal size={28} /> : index === 2 ? <Medal size={28} /> : `#${index + 1}`}
                  </div>
                  
                  <div className="col-span-6 md:col-span-7 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                      <User size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800 text-lg line-clamp-1">{item.user_name || 'Anonim'}</div>
                      <div className="text-xs text-gray-400">{new Date(item.waktu_pengerjaan).toLocaleDateString('id-ID')}</div>
                    </div>
                  </div>
                  
                  <div className="col-span-4 md:col-span-4 text-right">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                      <Award size={16} /> {Math.round(item.skor)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
