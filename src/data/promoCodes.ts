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
    code: "Venom",
    discount: 15,
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
