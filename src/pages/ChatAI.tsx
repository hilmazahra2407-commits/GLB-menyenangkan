import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Groq from 'groq-sdk';

// Use environment variable, fallback to empty string (will error if not set, but prevents crashing)
const apiKey = import.meta.env.VITE_GROQ_API_KEY || "";

// Initialize Groq client
const groq = new Groq({ 
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Required for client-side usage
});

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const ChatAI = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: `Halo ${user?.user_metadata?.full_name || 'Siswa'}! Aku adalah Asisten AI yang jago Fisika, khususnya materi Gerak Lurus Beraturan (GLB). Ada yang mau ditanyakan?`, sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!apiKey) {
        // Fallback mock if no API key is provided
        setTimeout(() => {
          let aiResponse = "Maaf, aku belum dihubungkan ke Groq API (VITE_GROQ_API_KEY kosong). Tapi secara umum, GLB adalah gerak dengan kecepatan konstan!";
          if (input.toLowerCase().includes('rumus')) aiResponse = "Rumus utama GLB adalah s = v × t. Dimana s adalah jarak, v adalah kecepatan, dan t adalah waktu.";
          
          setMessages(prev => [...prev, { id: Date.now(), text: aiResponse, sender: 'ai' }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Kamu adalah guru fisika yang ramah, ceria, dan interaktif. Tugasmu adalah menjawab pertanyaan siswa tentang 'Gerak Lurus Beraturan' (GLB) tingkat SMP/SMA. Gunakan bahasa yang mudah dimengerti, berikan contoh, dan sesekali gunakan emoji. Jangan menjawab pertanyaan yang terlalu jauh dari topik Fisika."
          },
          ...messages.map(m => ({
            role: m.sender === 'user' ? "user" : "assistant",
            content: m.text
          }) as any),
          {
            role: "user",
            content: input
          }
        ],
        model: "llama3-8b-8192", // Using a fast, standard model available on Groq
      });

      const responseText = completion.choices[0]?.message?.content || "Maaf, aku sedang bingung.";
      
      setMessages(prev => [...prev, { id: Date.now(), text: responseText, sender: 'ai' }]);
    } catch (error) {
      console.error("Groq API Error:", error);
      setMessages(prev => [...prev, { id: Date.now(), text: "Waduh, koneksiku ke otak Groq terputus nih! Coba lagi nanti ya.", sender: 'ai' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center pb-10">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border-4 border-accent h-[80vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-accent p-4 text-white flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-accent">
            <Bot size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold font-bubblegum text-dark">AI Fisika</h2>
            <p className="text-sm opacity-90 text-dark">Online - Siap membantu belajarmu!</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
              <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-accent text-white'}`}>
                {msg.sender === 'user' ? <UserIcon size={20} /> : <Bot size={20} />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-gray-800 rounded-tr-none' : 'bg-white border-2 border-gray-100 text-gray-700 rounded-tl-none shadow-sm'}`}>
                {/* Basic formatting for line breaks */}
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== msg.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 max-w-[80%] self-start">
              <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center bg-accent text-white">
                <Bot size={20} />
              </div>
              <div className="p-4 rounded-2xl bg-white border-2 border-gray-100 text-gray-500 rounded-tl-none shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan sesuatu tentang GLB..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-14 h-14 bg-dark text-white rounded-xl flex items-center justify-center hover:bg-[#a64d6b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            <Send size={24} />
          </button>
        </form>

      </div>
      {!apiKey && (
        <p className="text-red-500 text-sm mt-2 bg-red-50 p-2 rounded">Warning: VITE_GROQ_API_KEY is not set in environment. Using mock responses.</p>
      )}
    </div>
  );
};

export default ChatAI;
