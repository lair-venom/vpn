// Файл для управления ключами доступа пользователей
// Добавляйте новые ключи в этот массив

export interface UserKey {
  key: string;
  userId: string;
  isActive: boolean;
  description: string;
}

export const userKeys: UserKey[] = [
  {
    key: "lrvm",
    userId: "vm",
    isActive: true,
    description: "Пользователь 1"
  },
  {
    key: "VPN-USER-002", 
    userId: "user_002",
    isActive: true,
    description: "Тестовый пользователь 2"
  },
  {
    key: "VPN-ADMIN-001",
    userId: "admin_001", 
    isActive: true,
    description: "Администратор"
  }
];

export const validateUserKey = (key: string): UserKey | null => {
  const userKey = userKeys.find(
    uk => uk.key.toLowerCase() === key.toLowerCase() && uk.isActive
  );
  return userKey || null;
};
