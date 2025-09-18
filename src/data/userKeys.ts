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
    key: "7JMI3W",
    userId: "473875379",
    isActive: true,
    description: "Kirill"
  },
    {
    key: "86N7FW",
    userId: "571160520",
    isActive: true,
    description: "DANDY"
  },
    {
    key: "H3I2MW",
    userId: "661396226",
    isActive: true,
    description: "Monika"
  },
    {
    key: "6BI1P3",
    userId: "889666596",
    isActive: true,
    description: "Liza"
  },
    {
    key: "5F48WI",
    userId: "941242953",
    isActive: true,
    description: "Arina"
  },
    {
    key: "UIPTR8",
    userId: "1135132084",
    isActive: true,
    description: "Dmitry"
  },
    {
    key: "M2R5VG",
    userId: "1255553073",
    isActive: true,
    description: "Elona"
  },
    {
    key: "MCSK0X",
    userId: "1372271209",
    isActive: true,
    description: "Andrey"
  },
    {
    key: "Y5RZGX",
    userId: "1954594840",
    isActive: true,
    description: "pasha"
  },
  {
    key: "FYMJEB", 
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
