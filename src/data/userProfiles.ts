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
  maxDevices: number;
  username: string;
}

export const userProfiles: UserProfile[] = [
  {
    userId: "vm",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2024-01-15T10:30:00Z",
    promoCode: "VENOM",
    plan: "Создатель",
    status: "active",
    deviceCount: 666,
    maxDevices: 666,
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
    maxDevices: 3,
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
    maxDevices: 3,
    username: "DANDY"
  },
    {
    userId: "661396226",
    connectionDate: "2025-07-21T10:30:00Z",
    expirationDate: "2025-08-21T10:30:00Z",
    promoCode: "",
    plan: "Стандартный",
    status: "active",
    deviceCount: 1,
    maxDevices: 1,
    username: "Monika"
  },
    {
    userId: "vm",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2024-04-15T10:30:00Z",
    promoCode: "VENOM",
    plan: "Кибер VM",
    status: "active",
    deviceCount: 200,
    maxDevices: 200,
    username: "Venom"
  },
    {
    userId: "vm",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2024-04-15T10:30:00Z",
    promoCode: "VENOM",
    plan: "Кибер VM",
    status: "active",
    deviceCount: 200,
    maxDevices: 200,
    username: "Venom"
  },
    {
    userId: "vm",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2024-04-15T10:30:00Z",
    promoCode: "VENOM",
    plan: "Кибер VM",
    status: "active",
    deviceCount: 200,
    maxDevices: 200,
    username: "Venom"
  },
    {
    userId: "vm",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2024-04-15T10:30:00Z",
    promoCode: "VENOM",
    plan: "Кибер VM",
    status: "active",
    deviceCount: 200,
    maxDevices: 200,
    username: "Venom"
  },
    {
    userId: "vm",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2024-04-15T10:30:00Z",
    promoCode: "VENOM",
    plan: "Кибер VM",
    status: "active",
    deviceCount: 200,
    maxDevices: 200,
    username: "Venom"
  },
    {
    userId: "vm",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2024-04-15T10:30:00Z",
    promoCode: "VENOM",
    plan: "Кибер VM",
    status: "active",
    deviceCount: 200,
    maxDevices: 200,
    username: "Venom"
  },
    {
    userId: "vm",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2024-04-15T10:30:00Z",
    promoCode: "VENOM",
    plan: "Кибер VM",
    status: "active",
    deviceCount: 200,
    maxDevices: 200,
    username: "Venom"
  },
  {
    userId: "user_002",
    connectionDate: "2024-02-01T14:20:00Z", 
    expirationDate: "2024-03-01T14:20:00Z",
    plan: "Базовый",
    status: "expired",
    deviceCount: 1,
    maxDevices: 1,
    username: "TestUser2"
  },
  {
    userId: "admin_001",
    connectionDate: "2024-01-01T00:00:00Z",
    expirationDate: "2025-01-01T00:00:00Z",
    promoCode: "Lair",
    plan: "Кибер-VM",
    status: "active", 
    deviceCount: 5,
    maxDevices: 20,
    username: "Administrator"
  }
];

export const getUserProfile = (userId: string): UserProfile | null => {
  return userProfiles.find(profile => profile.userId === userId) || null;
};
