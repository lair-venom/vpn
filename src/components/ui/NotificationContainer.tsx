import React from 'react';
import Notification from './Notification';

interface NotificationContainerProps {
  notifications: Array<{
    id: number;
    type: 'success' | 'error';
    message: string;
  }>;
  onRemove: (id: number) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ 
  notifications,
  onRemove
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 space-y-4 flex flex-col items-center">
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          onClose={() => onRemove(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;