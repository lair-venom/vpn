import React, { useState } from 'react';
import { X, Key, LogIn } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (key: string) => Promise<boolean>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin
}) => {
  const [userKey, setUserKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userKey.trim()) return;

    setIsSubmitting(true);
    setError('');
    
    try {
      const success = await onLogin(userKey.trim());
      if (success) {
        setUserKey('');
        onClose();
      } else {
        setError('Неверный ключ доступа');
      }
    } catch (error) {
      setError('Произошла ошибка при входе');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setUserKey('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 relative animate-slide-in-bottom">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Вход в профиль</h2>
          <p className="text-gray-300">
            Введите ваш ключ доступа для входа в личный кабинет
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userKey" className="block text-sm font-medium text-gray-300 mb-2">
              Ключ доступа
            </label>
            <input
              type="text"
              id="userKey"
              value={userKey}
              onChange={(e) => {
                setUserKey(e.target.value.toUpperCase());
                setError('');
              }}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400 text-center font-mono text-lg"
              placeholder="VPN-USER-XXX"
              maxLength={20}
              required
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!userKey.trim() || isSubmitting}
            className="w-full flex items-center justify-center gap-2 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn className="w-4 h-4" />
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-white mb-2">Информация:</h3>
          <div className="space-y-1 text-xs text-gray-400">
            <p>• При покупке VPN у вас появляется свой ключ для входа в профиль где расположена информация о вашем тарифе. Ключ можно получить в нашем телеграмм боте. </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
