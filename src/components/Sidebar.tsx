import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Clock, Award, Trophy, Settings, MonitorPlay, X } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen = false, onClose }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Beranda', icon: <Home size={20} />, path: '/dashboard' },
    { name: 'Materi', icon: <BookOpen size={20} />, path: '/materi' },
    { name: 'Referensi Belajar', icon: <MonitorPlay size={20} />, path: '/referensi' },
    { name: 'Riwayat Kuis', icon: <Clock size={20} />, path: '/riwayat' },
    { name: 'Leaderboard', icon: <Award size={20} />, path: '/leaderboard' },
    { name: 'Pengaturan', icon: <Settings size={20} />, path: '/pengaturan' },
    { name: 'Tentang Kami', icon: <Trophy size={20} />, path: '/tentang-kami' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-800/40 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <div className={`w-64 bg-white h-screen fixed top-0 left-0 flex flex-col border-r border-gray-100 shadow-sm z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <button 
          className="md:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      <div className="p-6 flex flex-col items-center">
        <div className="flex flex-col items-center mb-2 text-center">
          <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain mt-2 drop-shadow-sm" />
        </div>
        <p className="text-xs text-[#f6b9cf] font-bold tracking-wider mt-2 text-center">• Gerak Lurus Beraturan •</p>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path || (location.pathname === '/materi' && item.path === '/materi' && location.search === '');
          
          const className = `flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all ${
            isActive 
              ? 'bg-[#e0f0ff] text-gray-800' 
              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
          }`;

          const content = (
            <>
              <div className={`${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
                {item.icon}
              </div>
              {item.name}
            </>
          );

          if (item.external) {
            return (
              <a 
                key={index} 
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {content}
              </a>
            );
          }

          return (
            <Link 
              key={index} 
              to={item.path}
              className={className}
            >
              {content}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <Link to="/leaderboard" className="flex items-center justify-between px-4 py-3 bg-[#fff0f5] text-[#c35e80] rounded-2xl font-bold hover:bg-[#ffe4ee] transition-all">
          <div className="flex items-center gap-3">
            <Trophy size={20} />
            Pencapaian
          </div>
          <span className="text-lg">›</span>
        </Link>
      </div>
      </div>
    </>
  );
};

export default Sidebar;
