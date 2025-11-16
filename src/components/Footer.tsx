import React from 'react';
import { Shield, Mail, MessageCircle, ArrowUp, Send } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-950 py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contacts */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-colors">
              <Mail className="h-5 w-5" />
              <span>fm666venom@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-colors">
              <Send className="h-5 w-5" />
              <a href="https://t.me/venom_vp_bot" target="_blank" rel="noopener noreferrer">
                Telegram Bot
              </a>
            </div>
            <div className="flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a77.15,77.15,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.22,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.75,80.21h0C129.78,55.03,122.766,31.7,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60.55,31,53.88s5-11.8,11.43-11.8c6.47,0,11.68,5.05,11.48,11.8C54.10,60.55,48.9,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60.55,73.25,53.88s5-11.8,11.44-11.8c6.47,0,11.67,5.05,11.48,11.8C95.34,60.55,90.14,65.69,84.69,65.69Z"/>
              </svg>
              <a href="https://discord.gg/eXJMRkupyA" target="_blank" rel="noopener noreferrer">
                Discord Support 24/7
              </a>
            </div>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="group bg-gray-800 hover:bg-orange-500 p-4 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <ArrowUp className="h-6 w-6 text-orange-500 group-hover:text-white transition-colors" />
          </button>

          {/* Credit */}
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-orange-500">Автор fm.venom</span>
            </div>
            <div className="text-sm">
              <span className="text-orange-500">C 🧡 Lair-Venom</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
