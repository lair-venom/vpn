import React from 'react';
import { Shield, Mail, MessageCircle, ArrowUp } from 'lucide-react';

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
              <MessageCircle className="h-5 w-5" />
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