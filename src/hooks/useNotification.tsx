import { useState, useCallback } from 'react';
import { NotificationType } from '../components/ui/Notification';

interface NotificationState {
  type: NotificationType;
  message: string;
  id: number;
}

export const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationState[]>([]);

  const showNotification = useCallback((type: NotificationType, message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { type, message, id }]);
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return {
    notifications,
    showNotification,
    removeNotification
  };
};

export default useNotification;