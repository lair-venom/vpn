import React from 'react';
import PromoNotification from './PromoNotification';

interface PromoNotificationContainerProps {
  notifications: Array<{
    id: number;
    type: 'success' | 'error';
    message: string;
    discount?: number;
  }>;
  onRemove: (id: number) => void;
}

const PromoNotificationContainer: React.FC<PromoNotificationContainerProps> = ({ 
  notifications,
  onRemove
}) => {
  return (
    <div className="fixed top-20 right-4 z-50 space-y-4 flex flex-col items-end">
      {notifications.map(notification => (
        <PromoNotification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          discount={notification.discount}
          onClose={() => onRemove(notification.id)}
        />
      ))}
    </div>
  );
};

export default PromoNotificationContainer;