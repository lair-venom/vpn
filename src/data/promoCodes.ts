// Файл для управления промокодами
// Добавляйте новые промокоды в этот массив

export interface PromoCode {
  code: string;
  discount: number; // процент скидки
  description: string;
  isActive: boolean;
}

export const promoCodes: PromoCode[] = [
  {
    code: "SKOV",
    discount: 15,
    description: "Скидка от друга",
    isActive: true
  },
  {
    code: "BADSAMPLE",
    discount: 15,
    description: "Скидка от друга",
    isActive: true
  },
  {
    code: "DANDY",
    discount: 15,
    description: "Приветственная скидка",
    isActive: true
  },
  {
    code: "pasha",
    discount: 15,
    description: "Приветственная скидка",
    isActive: true
  },
  {
    code: "Elona",
    discount: 15,
    description: "Приветственная скидка",
    isActive: true
  },
  {
    code: "Liza",
    discount: 15,
    description: "Приветственная скидка",
    isActive: true
  },
    {
    code: "Kirill",
    discount: 15,
    description: "Приветственная скидка",
    isActive: true
  },
    {
    code: "Dmitry",
    discount: 15,
    description: "Приветственная скидка",
    isActive: true
  },
    {
    code: "Andrey",
    discount: 15,
    description: "Приветственная скидка",
    isActive: true
  },
  {
    code: "Venom",
    discount: 30,
    description: "Приветственная скидка",
    isActive: true
  },
  {
    code: "Lair",
    discount: 15,
    description: "Экономия 15%",
    isActive: true
  }
];

export const validatePromoCode = (code: string): PromoCode | null => {
  const promoCode = promoCodes.find(
    promo => promo.code.toLowerCase() === code.toLowerCase() && promo.isActive
  );
  return promoCode || null;
};
