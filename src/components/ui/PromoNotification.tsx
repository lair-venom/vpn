import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X, Gift } from 'lucide-react';

export type PromoNotificationType = 'success' | 'error';

interface PromoNotificationProps {
  type: PromoNotificationType;
  message: string;
  discount?: number;
  onClose: () => void;
  duration?: number;
}

const PromoNotification: React.FC<PromoNotificationProps> = ({ 
  type, 
  message, 
  discount,
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const Icon = type === 'success' ? CheckCircle : AlertCircle;
  const bgColor = type === 'success' ? 'bg-gray-800' : 'bg-gray-800';
  const borderColor = type === 'success' ? 'border-green-500' : 'border-red-500';
  const iconColor = type === 'success' ? 'text-green-500' : 'text-red-500';

  return (
    <div
      className={`max-w-sm w-full p-4 ${bgColor} border ${borderColor} rounded-lg shadow-lg animate-slide-in-bottom relative overflow-hidden`}
      role="alert"
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-medium text-gray-200">{message}</p>
            {type === 'success' && discount && (
              <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                <Gift className="h-3 w-3 text-green-500" />
                <span className="text-xs font-bold text-green-500">-{discount}%</span>
              </div>
            )}
          </div>
          {type === 'success' && (
            <p className="text-xs text-gray-400">
              Скидка применена к вашему заказу
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-300 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div 
        className={`absolute bottom-0 left-0 h-1 w-full ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} animate-progress rounded-b-lg`} 
        style={{ animationDuration: `${duration}ms` }} 
      />
    </div>
  );
};

export default PromoNotification;