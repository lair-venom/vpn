import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export type NotificationType = 'success' | 'error';

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({ 
  type, 
  message, 
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
  const borderColor = type === 'success' ? 'border-orange-500' : 'border-red-500';
  const iconColor = type === 'success' ? 'text-orange-500' : 'text-red-500';

  return (
    <div
      className={`max-w-sm w-full p-4 ${bgColor} border ${borderColor} rounded-lg shadow-lg animate-slide-in-bottom`}
      role="alert"
    >
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${iconColor}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-gray-200">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-300 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full bg-orange-500 animate-progress rounded-b-lg" style={{ animationDuration: `${duration}ms` }} />
    </div>
  );
};

export default Notification;