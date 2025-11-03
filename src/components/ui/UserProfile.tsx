import React, { useCallback } from 'react';
import { X, Calendar, Gift, Shield, Activity, Smartphone, CheckCircle, Clock, AlertTriangle, User, Crown, Zap } from 'lucide-react';
import { UserProfile as UserProfileType } from '../../data/userProfiles';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfileType;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  isOpen,
  onClose,
  profile,
  onLogout
}) => {
  const formatDate = (dateString: string) => {
    if (dateString === 'infinite' || dateString === '∞') {
      return '∞ Бесконечно';
    }
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'active':
        return {
          text: 'Активен',
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          icon: <CheckCircle className="w-5 h-5" />,
          animation: 'animate-pulse'
        };
      case 'expired':
        return {
          text: 'Истек',
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          icon: <AlertTriangle className="w-5 h-5" />,
          animation: ''
        };
      case 'suspended':
        return {
          text: 'Приостановлен',
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/20',
          borderColor: 'border-yellow-500/30',
          icon: <Clock className="w-5 h-5" />,
          animation: 'animate-pulse'
        };
      default:
        return {
          text: 'Неизвестно',
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20',
          borderColor: 'border-gray-500/30',
          icon: <Activity className="w-5 h-5" />,
          animation: ''
        };
    }
  };

  const getPlanIcon = (plan: string) => {
    if (plan.includes('Создатель') || plan.includes('Кибер-VM')) {
      return <Crown className="w-6 h-6 text-purple-400" />;
    }
    if (plan.includes('Премиум') || plan.includes('Продвинутый')) {
      return <Zap className="w-6 h-6 text-orange-400" />;
    }
    return <Shield className="w-6 h-6 text-blue-400" />;
  };

  const getPlanGradient = (plan: string) => {
    if (plan.includes('Создатель') || plan.includes('Кибер-VM')) {
      return 'from-purple-500 to-pink-600';
    }
    if (plan.includes('Премиум') || plan.includes('Продвинутый')) {
      return 'from-orange-500 to-red-600';
    }
    return 'from-blue-500 to-cyan-600';
  };

  const statusInfo = getStatusInfo(profile.status);

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  // Обработчик клика по оверлею
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Обработчик нажатия клавиши Escape
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-md w-full p-8 relative animate-slide-in-bottom max-h-[90vh] overflow-y-auto custom-scrollbar border border-gray-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full z-10"
          aria-label="Закрыть"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className={`w-20 h-20 bg-gradient-to-r ${getPlanGradient(profile.plan)} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ring-4 ring-gray-700`}>
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{profile.username}</h2>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor} ${statusInfo.animation}`}>
            <span className={statusInfo.color}>{statusInfo.icon}</span>
            <span className={`font-semibold ${statusInfo.color}`}>{statusInfo.text}</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Plan Card */}
          <div className={`bg-gradient-to-r ${getPlanGradient(profile.plan)} p-[1px] rounded-2xl`}>
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getPlanIcon(profile.plan)}
                  <div>
                    <span className="text-gray-300 text-sm">Тариф</span>
                    <p className="text-white font-bold text-lg">{profile.plan}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-orange-400" />
                    <span className="text-2xl font-bold text-white">{profile.deviceCount}</span>
                  </div>
                  <span className="text-gray-400 text-sm">устройств</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dates Section */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-700/50 backdrop-blur-sm rounded-2xl p-5 border border-gray-600/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <span className="text-gray-300 text-sm">Дата окончания</span>
                  <p className="text-white font-semibold">{formatDate(profile.expirationDate)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Code */}
          {profile.promoCode && (
            <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-2xl p-5 border border-orange-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <span className="text-gray-300 text-sm">Промокод</span>
                  <p className="text-orange-400 font-bold font-mono text-lg">{profile.promoCode}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Выйти из профиля
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-2xl"></div>
      </div>
    </div>
  );
};

export default UserProfile;
