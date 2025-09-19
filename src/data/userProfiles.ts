// Файл для управления профилями пользователей
// Добавляйте новые профили в этот массив

export interface UserProfile {
  userId: string;
  connectionDate: string; // ISO date string
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
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "infinite",
    promoCode: "VENOM",
    plan: "Создатель",
    status: "active",
    deviceCount: 666,
    username: "Venom"
  },
   {
    userId: "473875379",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2026-06-29T12:40:00Z", 
    promoCode: "Kirill",
    plan: "Продвинутый",
    status: "active",
    deviceCount: 3,
    username: "Kirill"
  },
    {
    userId: "571160520",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2024-04-15T10:30:00Z",
    promoCode: "DANDY",
    plan: "Продвинутый",
    status: "active",
    deviceCount: 3,
    username: "DANDY"
  },
    {
    userId: "661396226",
    connectionDate: "2025-07-21T10:30:00Z",
    expirationDate: "2025-08-21T10:30:00Z",
    promoCode: "",
    plan: "Базовый",
    status: "active",
    deviceCount: 1,
    username: "Monika"
  },
  {
    userId: "889666596",
    connectionDate: "2024-12-01T14:20:00Z", 
    expirationDate: "2025-03-01T14:20:00Z",
    promoCode: "Liza",
    plan: "Премиум",
    status: "active",
    deviceCount: 5,
    username: "Liza"
  },
  {
    userId: "5515415353",
    connectionDate: "2024-11-15T09:15:00Z",
    expirationDate: "2025-02-15T09:15:00Z",
    promoCode: "SKOV",
    plan: "Базовый",
    status: "active",
    deviceCount: 1,
    username: "SKOV"
  },
  {
    userId: "admin_001",
    connectionDate: "infinite",
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
