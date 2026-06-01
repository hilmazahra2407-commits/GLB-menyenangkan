import { useState, useEffect } from 'react';
import { getReferensi, type Referensi as ReferensiType } from '../lib/api';
import { ExternalLink, BookOpen, Video, FileText, Globe } from 'lucide-react';

const Referensi = () => {
  const [referensi, setReferensi] = useState<ReferensiType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReferensi().then(data => {
      setReferensi(data);
      setLoading(false);
    });
  }, []);

  const getIcon = (tipe: string) => {
    switch (tipe) {
      case 'video': return <Video className="text-red-500" />;
      case 'artikel': return <FileText className="text-blue-500" />;
      case 'buku_jurnal': return <BookOpen className="text-green-500" />;
      case 'website': return <Globe className="text-purple-500" />;
      default: return <BookOpen className="text-gray-500" />;
    }
  };

  if (loading) {
    return <div className="flex-1 flex justify-center items-center text-xl text-gray-500 font-bold">Memuat Referensi...</div>;
  }

  return (
    <div className="flex-1 flex flex-col pt-6 pb-20 w-full max-w-5xl mx-auto h-[calc(100vh-100px)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bubblegum text-gray-800">Referensi Belajar</h1>
          <p className="text-gray-500 font-medium">Bahan bacaan tambahan untuk memperdalam materimu</p>
        </div>
      </div>

      <div className="mb-8 w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Video Pembelajaran Pilihan</h2>
        <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-sm border-4 border-white bg-gray-100">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/TjdQ-vLEF-g" 
            title="Video Pembelajaran GLB" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">Referensi Lainnya</h2>
      {referensi.length === 0 ? (
        <div className="bg-white p-8 rounded-3xl shadow-sm border-4 border-gray-100 text-center">
          <p className="text-gray-500">Belum ada referensi yang ditambahkan di database.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6 pr-2">
          {referensi.map((ref) => (
            <a 
              key={ref.id} 
              href={ref.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-3xl border-4 border-white shadow-sm hover:border-[#93d7e2] hover:-translate-y-2 transition-all flex flex-col h-full group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-[#e0f0ff] transition-colors">
                  {getIcon(ref.tipe)}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {ref.tipe.replace('_', ' ')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {ref.judul}
              </h3>
              <p className="text-gray-600 text-sm flex-1 line-clamp-3 mb-4">
                {ref.deskripsi}
              </p>
              <div className="flex items-center text-sm font-bold text-primary mt-auto">
                Buka Link <ExternalLink size={16} className="ml-2" />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Referensi;
