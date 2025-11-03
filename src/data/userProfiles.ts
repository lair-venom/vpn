// Файл для управления профилями пользователей
// Добавляйте новые профили в этот массив

export interface UserProfile {
  userId: string;
  expirationDate: string; // ISO date string
  promoCode?: string;
  plan: string;
  status: 'active' | 'expired' | 'suspended';
  deviceCount: number;
  username: string;
}

export const userProfiles: UserProfile[] = [
  {
    userId: "vm",
    expirationDate: "infinite",
    promoCode: "VENOM",
    plan: "Создатель",
    status: "active",
    deviceCount: 999,
    username: "Venom"
  },
    {
    userId: "1666581983",
    expirationDate: "2026-01-30T12:34:00Z",
    promoCode: "BadSample",
    plan: "Продвинутый",
    status: "active",
    deviceCount: 3,
    username: "BadSample"
  },
   {
    userId: "473875379",
    expirationDate: "2026-07-28T12:34:00Z", 
    promoCode: "Kirill",
    plan: "Продвинутый",
    status: "active",
    deviceCount: 3,
    username: "Kirill"
  },
    {
    userId: "571160520",
    expirationDate: "infinite",
    promoCode: "DANDY",
    plan: "Продвинутый",
    status: "active",
    deviceCount: 3,
    username: "DANDY"
  },
  {
    userId: "889666596",
    expirationDate: "2026-08-24T14:20:00Z",
    promoCode: "Liza",
    plan: "Базовый",
    status: "active",
    deviceCount: 1,
    username: "Liza"
  },
  {
    userId: "941242953",
    expirationDate: "2026-09-15T09:15:00Z",
    promoCode: "Arina",
    plan: "Базовый",
    status: "active",
    deviceCount: 1,
    username: "Arina"
  },
    {
    userId: "1135132084",
    expirationDate: "2026-08-25T09:15:00Z",
    promoCode: "Dmitry",
    plan: "Продвинутый",
    status: "active",
    deviceCount: 3,
    username: "Dmitry"
  },
    {
    userId: "1255553073",
    expirationDate: "2026-10-22T09:15:00Z",
    promoCode: "Elona",
    plan: "Продвинутый",
    status: "active",
    deviceCount: 3,
    username: "Elona"
  },
    {
    userId: "1372271209",
    expirationDate: "infinite",
    promoCode: "Andrey",
    plan: "Продвинутый",
    status: "active",
    deviceCount: 3,
    username: "Andrey"
  },
  {
    userId: "1954594840",
    expirationDate: "infinite",
    promoCode: "pasha",
    plan: "Продвинутый",
    status: "active",
    deviceCount: 3,
    username: "pasha"
  },
      {
    userId: "5515415353",
    expirationDate: "infinite",
    promoCode: "SKOV",
    plan: "Продвинутый",
    status: "active",
    deviceCount: 3,
    username: "SKOV"
  },
  {
    userId: "admin_001",
    expirationDate: "infinite",
    promoCode: "Lair",
    plan: "Кибер-VM",
    status: "active", 
    deviceCount: 20,
    username: "Administrator"
  }
];

export const getUserProfile = (userId: string): UserProfile | null => {
  return userProfiles.find(profile => profile.userId === userId) || null;
};
