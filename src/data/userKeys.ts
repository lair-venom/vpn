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
    description: "Venom"
  },
  {
    key: "473875379",
    userId: "473875379",
    isActive: true,
    description: "Kirill"
  },
    {
    key: "571160520",
    userId: "571160520",
    isActive: true,
    description: "DANDY"
  },
  {
    key: "889666596",
    userId: "889666596",
    isActive: true,
    description: "Liza"
  },
    {
    key: "941242953",
    userId: "941242953",
    isActive: true,
    description: "Arina"
  },
    {
    key: "1135132084",
    userId: "1135132084",
    isActive: true,
    description: "Dmitry"
  },
    {
    key: "1255553073",
    userId: "1255553073",
    isActive: true,
    description: "Elona"
  },
    {
    key: "1372271209",
    userId: "1372271209",
    isActive: true,
    description: "Andrey"
  },
    {
    key: "1954594840",
    userId: "1954594840",
    isActive: true,
    description: "pasha"
  },
  {
    key: "5515415353", 
    userId: "5515415353",
    isActive: true,
    description: "SKOV"
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
