import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-orange-500" />
          <span className="text-xl font-bold">Venom<span className="text-orange-500">VPN</span></span>
        </div>

        <nav className="hidden md:flex space-x-8">
          <a href="#about" className="text-gray-300 hover:text-orange-400 transition-colors">О сервисе</a>
          <a href="#features" className="text-gray-300 hover:text-orange-400 transition-colors">Преимущества</a>
          <a href="#pricing" className="text-gray-300 hover:text-orange-400 transition-colors">Купить</a>
          <a href="#installation" className="text-gray-300 hover:text-orange-400 transition-colors">Установка</a>
          <a href="#tutorials" className="text-gray-300 hover:text-orange-400 transition-colors">Информация</a>
          <a href="#download" className="text-gray-300 hover:text-orange-400 transition-colors">Рекомендуемые клиенты</a>
        </nav>

        <button 
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div 
        className={`md:hidden bg-gray-850 overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-custom py-4 flex flex-col space-y-4">
          <a 
            href="#about" 
            className="text-gray-300 hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            О сервисе
          </a>
          <a 
            href="#features" 
            className="text-gray-300 hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Преимущества
          </a>
          <a 
            href="#pricing" 
            className="text-gray-300 hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Купить
          </a>
          <a 
            href="#installation" 
            className="text-gray-300 hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Установка
          </a>
          <a 
            href="#tutorials" 
            className="text-gray-300 hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Информация
          </a>
          <a 
            href="#download" 
            className="text-gray-300 hover:text-orange-400 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Рекомендуемые клиенты
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
