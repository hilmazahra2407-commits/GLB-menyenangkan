import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Mail, X } from 'lucide-react';

const teamMembers = [
  {
    name: 'Aminah Nur Azizah',
    email: 'aminahnurazizah32@gmail.com',
    product: 'Papan Vektor pada Gerak Parabola',
    price: 'Rp 120.000 - Rp 250.000',
    image: '/assets/Aminah.jpg',
    instagram: 'aminah.nra'
  },
  {
    name: 'Hilma Zahra Nur Kholisah',
    email: 'hilmazahra.24@gmail.com',
    product: 'Peraga GLB',
    price: 'Rp 85.000',
    image: '/assets/Hilma.jpg',
    instagram: 'hilmazzhra'
  },
  {
    name: 'Lailatul Rahmi',
    email: 'lailatulrahmi576@gmail.com',
    product: 'Monopoli GLB',
    price: 'Rp 50.000',
    image: '/assets/Lailatul%20.jpg',
    instagram: 'xraahmii'
  },
  {
    name: 'Naila Amalia',
    email: 'nai.nailaamaliaa@gmail.com',
    product: 'Poster Interaktif GLB',
    price: 'Rp 50.000',
    image: '/assets/Naila.jpg',
    instagram: 'neennaii'
  }
];

const TentangKami = () => {
  const [selectedProduct, setSelectedProduct] = useState<typeof teamMembers[0] | null>(null);

  return (
    <div className="flex-1 flex flex-col items-center pb-20 relative">
      <div className="w-full max-w-6xl text-center mb-12">
        <h1 className="text-5xl font-bubblegum text-dark mb-4">Tentang Kami</h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Kami adalah tim pengembang yang berkomitmen menciptakan media pembelajaran Fisika yang asik, interaktif, dan mudah dipahami oleh siswa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {teamMembers.map((member, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-white flex flex-col"
          >
            <div className="aspect-[4/3] bg-primary relative overflow-hidden">
               <img 
                 src={member.image} 
                 alt={member.name}
                 className="w-full h-full object-cover object-[center_20%]"
                 onError={(e) => {
                   e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=f6b9cf&color=c35e80&size=512`;
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
              <a href={`mailto:${member.email}`} className="text-sm text-primary hover:underline mb-4 break-all">
                {member.email}
              </a>
              
              <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col items-center">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Produk Media Analog</p>
                <p className="text-sm font-medium text-dark mb-1">{member.product}</p>
                {member.price && <p className="text-sm font-bold text-green-600 mb-4">{member.price}</p>}
                
                <button 
                  onClick={() => setSelectedProduct(member)}
                  className="w-full py-2 bg-dark text-white font-bold rounded-xl shadow hover:bg-[#a64d6b] transition-colors flex items-center justify-center gap-2 mt-auto"
                >
                  <ShoppingCart size={18} /> Beli Produk
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Beli Produk */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-md rounded-3xl p-8 relative z-10 shadow-2xl border-4 border-[#fff0f5]"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#e0f0ff] text-[#4785c4] rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Beli {selectedProduct.product}</h2>
                <p className="text-gray-600">Oleh: {selectedProduct.name}</p>
                <p className="text-xl font-bold text-green-600 mt-2">{selectedProduct.price}</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider text-center mb-2">Pilih metode pembelian</p>
                
                <a 
                  href={`mailto:${selectedProduct.email}?subject=Tertarik Membeli ${selectedProduct.product}&body=Halo kak ${selectedProduct.name},%0D%0A%0D%0ASaya tertarik untuk membeli produk media analog ${selectedProduct.product}.%0D%0AMohon infokan ketersediaan dan cara pembayarannya.%0D%0A%0D%0ATerima kasih.`}
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="w-12 h-12 bg-[#fff0f5] text-[#c35e80] rounded-xl flex items-center justify-center group-hover:bg-[#f6b9cf] group-hover:text-white transition-colors">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Pesan via Email</h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{selectedProduct.email}</p>
                  </div>
                </a>
                
                <a 
                  href={selectedProduct.instagram ? `https://instagram.com/${selectedProduct.instagram}` : "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-100 hover:border-[#E1306C] hover:bg-[#E1306C]/5 transition-all group"
                >
                  <div className="w-12 h-12 bg-pink-50 text-[#E1306C] rounded-xl flex items-center justify-center group-hover:bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#C13584] group-hover:text-white transition-all">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Hubungi via Instagram</h3>
                    <p className="text-sm text-gray-500">Kirim pesan langsung (DM)</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TentangKami;
