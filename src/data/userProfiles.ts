export interface UserProfile {
  userId: string;
  connectionDate: string; // ISO date string
  expirationDate: string | null; // null для бесконечного срока
  promoCode?: string;
  plan: string;
  status: 'active' | 'expired' | 'suspended';
  deviceCount: number;
  maxDevices: number;
  username: string;
}

// Безопасная функция парсинга даты
const safeDateParse = (dateString: string | null): Date | null => {
  if (dateString === null) return null;
  
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

// Функция проверки истечения срока
export const isProfileExpired = (profile: UserProfile): boolean => {
  if (profile.expirationDate === null) {
    return false; // Бесконечный срок никогда не истекает
  }
  
  const expirationDate = safeDateParse(profile.expirationDate);
  if (expirationDate === null) {
    console.warn(`Invalid expiration date for user ${profile.userId}: ${profile.expirationDate}`);
    return true; // Если дата невалидна, считаем истекшей
  }
  
  const now = new Date();
  return expirationDate <= now;
};

// Функция проверки активности профиля
export const isProfileActive = (profile: UserProfile): boolean => {
  return profile.status === 'active' && !isProfileExpired(profile);
};

// Функция форматирования даты для отображения
export const formatExpirationDate = (expirationDate: string | null): string => {
  if (expirationDate === null) return '♾️ Бессрочно';
  
  const date = safeDateParse(expirationDate);
  if (date === null) return 'Неверная дата';
  
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const userProfiles: UserProfile[] = [
  {
    userId: "vm",
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "null",
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
    connectionDate: "2024-01-15T10:30:00Z",
    expirationDate: "2024-04-15T10:30:00Z",
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

// Дополнительные утилиты
export const getActiveProfiles = (): UserProfile[] => {
  return userProfiles.filter(isProfileActive);
};

export const getExpiredProfiles = (): UserProfile[] => {
  return userProfiles.filter(profile => isProfileExpired(profile));
};
