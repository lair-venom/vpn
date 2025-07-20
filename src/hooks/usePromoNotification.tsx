import { useState, useCallback } from 'react';
import { PromoNotificationType } from '../components/ui/PromoNotification';

interface PromoNotificationState {
  type: PromoNotificationType;
  message: string;
  discount?: number;
  id: number;
}

export const usePromoNotification = () => {
  const [notifications, setNotifications] = useState<PromoNotificationState[]>([]);

  const showPromoNotification = useCallback((type: PromoNotificationType, message: string, discount?: number) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { type, message, discount, id }]);
  }, []);

  const removePromoNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  return {
    promoNotifications: notifications,
    showPromoNotification,
    removePromoNotification
  };
};

export default usePromoNotification;