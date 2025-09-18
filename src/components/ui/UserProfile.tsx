import React from 'react';
import { X, Calendar, Gift, Shield, Activity, Smartphone, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
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
          icon: <CheckCircle className="w-4 h-4" />,
          animation: 'animate-pulse'
        };
      case 'expired':
        return {
          text: 'Истек',
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          icon: <AlertTriangle className="w-4 h-4" />,
          animation: ''
        };
      case 'suspended':
        return {
          text: 'Приостановлен',
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/20',
          icon: <Clock className="w-4 h-4" />,
          animation: 'animate-pulse'
        };
      default:
        return {
          text: 'Неизвестно',
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20',
          icon: <Activity className="w-4 h-4" />,
          animation: ''
        };
    }
  };

  const statusInfo = getStatusInfo(profile.status);

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 relative animate-slide-in-bottom max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Профиль VPN</h2>
          <p className="text-gray-300">
            {profile.username}
          </p>
        </div>

        <div className="space-y-4">
          {/* Статус */}
          <div className="bg-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300 font-medium">Статус</span>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusInfo.bgColor} ${statusInfo.animation}`}>
                <span className={statusInfo.color}>{statusInfo.icon}</span>
                <span className={`font-medium ${statusInfo.color}`}>{statusInfo.text}</span>
              </div>
            </div>
          </div>

          {/* Тариф */}
          <div className="bg-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-medium">Тариф</span>
              <span className="text-white font-semibold">{profile.plan}</span>
            </div>
          </div>

          {/* Даты */}
          <div className="bg-gray-700 rounded-xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300 font-medium">Дата подключения</span>
              </div>
              <span className="text-white text-sm text-right">{formatDate(profile.connectionDate)}</span>
            </div>
            <div className="border-t border-gray-600 pt-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-400" />
                  <span className="text-gray-300 font-medium">Дата окончания</span>
                </div>
                <span className="text-white text-sm text-right">{formatDate(profile.expirationDate)}</span>
              </div>
            </div>
          </div>

          {/* Промокод */}
          {profile.promoCode && (
            <div className="bg-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-orange-500" />
                  <span className="text-gray-300 font-medium">Промокод</span>
                </div>
                <span className="text-orange-400 font-mono font-semibold">{profile.promoCode}</span>
              </div>
            </div>
          )}

          {/* Устройства */}
          <div className="bg-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-orange-500" />
                <span className="text-gray-300 font-medium">Устройства</span>
              </div>
              <span className="text-white font-semibold">
                {profile.deviceCount} / {profile.maxDevices}
              </span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(profile.deviceCount / profile.maxDevices) * 100}%` }}
              ></div>
            </div>
          
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            Выйти из профиля
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
