import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Menu, X, User, LogIn } from 'lucide-react';
import LoginModal from './ui/LoginModal';
import UserProfile from './ui/UserProfile';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, userProfile, login, logout } = useAuth();

  const isHomePage = location.pathname === '/';

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

  const handleLogin = async (key: string): Promise<boolean> => {
    return await login(key);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsProfileOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
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

          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex space-x-8">
              {isHomePage ? (
                <>
                  <a href="#about" className="text-gray-300 hover:text-orange-400 transition-colors">О сервисе</a>
                  <a href="#features" className="text-gray-300 hover:text-orange-400 transition-colors">Преимущества</a>
                  <a href="#pricing" className="text-gray-300 hover:text-orange-400 transition-colors">Купить</a>
                  <a href="#installation" className="text-gray-300 hover:text-orange-400 transition-colors">Установка</a>
                  <button
                    onClick={() => navigate('/faq')}
                    className="text-gray-300 hover:text-orange-400 transition-colors"
                  >
                    Информация
                  </button>
                  <a href="#download" className="text-gray-300 hover:text-orange-400 transition-colors">Рекомендуемые клиенты</a>
                </>
              ) : (
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Главная
                </button>
              )}
            </nav>

            {/* Login/Profile Button */}
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
            >
              {isAuthenticated ? (
                <>
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Профиль</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Вход</span>
                </>
              )}
            </button>

            <button 
              className="md:hidden text-gray-300 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <div 
          className={`md:hidden bg-gray-850 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="container-custom py-4 flex flex-col space-y-4">
            {isHomePage ? (
              <>
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
                <button
                  onClick={() => {
                    navigate('/faq');
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-orange-400 transition-colors text-left"
                >
                  Информация
                </button>
                <a
                  href="#download"
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Рекомендуемые клиенты
                </a>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-orange-400 transition-colors text-left"
              >
                Главная
              </button>
            )}
            
            {/* Mobile Login Button */}
            <button
              onClick={() => {
                handleProfileClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors w-fit"
            >
              {isAuthenticated ? (
                <>
                  <User className="w-4 h-4" />
                  Профиль
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Вход
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />

      {userProfile && (
        <UserProfile
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          profile={userProfile}
          onLogout={logout}
        />
      )}
    </>
  );
};

export default Header;
