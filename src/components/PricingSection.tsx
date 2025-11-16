import React, { useState } from 'react';
import { Check, Shield, Zap, Crown, Server } from 'lucide-react';
import PaymentModal from './ui/PaymentModal';
import PromoCodeModal from './ui/PromoCodeModal';
import PromoNotificationContainer from './ui/PromoNotificationContainer';
import { validatePromoCode } from '../data/promoCodes';
import { usePromoNotification } from '../hooks/usePromoNotification';

interface Plan {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
  features: string[];
  popular?: boolean;
  color: string;
  isLifetime?: boolean;
}
 
const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Базовый',
    icon: <Shield className="w-8 h-8" />,
    basePrice: 150,
    color: 'from-blue-500 to-blue-600',
    features: [
      'Безлимитный трафик',
      '1 устройство',
      'Максимальная скорость',
      'Базовая поддержка',
      'Все устройства'
    ]
  },
  {
    id: 'advanced',
    name: 'Продвинутый',
    icon: <Zap className="w-8 h-8" />,
    basePrice: 250,
    color: 'from-green-500 to-green-600',
    popular: true,
    features: [
      'Безлимитный трафик',
      '3 устройства',
      'Максимальная скорость',
      'Приор.поддержка',
      'Все устройства'
    ]
  },
  {
    id: 'premium',
    name: 'Премиум',
    icon: <Crown className="w-8 h-8" />,
    basePrice: 400,
    color: 'from-purple-500 to-purple-600',
    features: [
      'Безлимитный трафик',
      '5 устройств',
      'Максимальная скорость',
      'VIP поддержка 24/7',
      'Все устройства'
    ]
  },
  {
    id: 'cyber-vm',
    name: 'Кибер-VM',
    icon: <Server className="w-8 h-8" />,
    basePrice: 5040,
    color: 'from-orange-500 to-red-600',
    isLifetime: true,
    features: [
      'Безлимитный трафик',
      '5 устройств',
      'Максимальная скорость',
      'Личный менеджер',
      'Все устройства'
    ]
  }
];

interface PricingSectionProps {
  showNotification: (type: 'success' | 'error', message: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ showNotification }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'1month' | '3months' | '1year'>('1month');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [showTrialForm, setShowTrialForm] = useState(false);
  const [trialData, setTrialData] = useState({
    telegram: '',
    source: ''
  });
  const [isSubmittingTrial, setIsSubmittingTrial] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const { promoNotifications, showPromoNotification, removePromoNotification } = usePromoNotification();

  // Конфигурация Telegram бота
  const TELEGRAM_BOT_TOKEN = '7929772519:AAEMmZU84D4RuGxqnfaBEwMbl_OX4gbPWSg';
  const TELEGRAM_CHAT_ID = '8038371412';

  const getPeriodMultiplier = () => {
    switch (selectedPeriod) {
      case '1month': return 1;
      case '3months': return 2.55; // 15% скидка
      case '1year': return 8.4; // 30% скидка
      default: return 1;
    }
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case '1month': return '1 месяц';
      case '3months': return '3 месяца';
      case '1year': return '1 год';
      default: return '1 месяц';
    }
  };

  const getDiscount = () => {
    switch (selectedPeriod) {
      case '3months': return 15;
      case '1year': return 30;
      default: return 0;
    }
  };

  const calculatePrice = (basePrice: number) => {
    const baseTotal = Math.round(basePrice * getPeriodMultiplier());
    if (promoDiscount > 0 && (selectedPeriod === '3months' || selectedPeriod === '1year')) {
      return Math.round(baseTotal * (1 - promoDiscount / 100));
    }
    return baseTotal;
  };

  const getOriginalPrice = (basePrice: number) => {
    return Math.round(basePrice * getPeriodMultiplier());
  };

  const handleApplyPromo = async (code: string) => {
    const promoCode = validatePromoCode(code);
    if (promoCode) {
      try {
        // Получаем информацию о пользователе
        const deviceInfo = {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
          language: navigator.language,
          screenResolution: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timestamp: new Date().toISOString()
        };

        // Формируем сообщение для Telegram
        const message = `🎁 <b>Промокод применен</b>\n\n` +
          `📝 <b>Промокод:</b> <code>${code}</code>\n` +
          `💰 <b>Скидка:</b> ${promoCode.discount}%\n` +
          `📱 <b>Устройство:</b> ${deviceInfo.platform}\n` +
          `🌐 <b>Браузер:</b> ${deviceInfo.userAgent.split(' ').slice(-2).join(' ')}\n` +
          `🗣️ <b>Язык:</b> ${deviceInfo.language}\n` +
          `📺 <b>Разрешение:</b> ${deviceInfo.screenResolution}\n` +
          `🕐 <b>Часовой пояс:</b> ${deviceInfo.timezone}\n` +
          `⏰ <b>Время применения:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
          `<i>VenomVPN Promo System</i>`;

        // Отправляем данные в Telegram
        await fetch(`https://api.telegram.org/bot7929772519:AAEMmZU84D4RuGxqnfaBEwMbl_OX4gbPWSg/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: 8038371412,
            text: message,
            parse_mode: 'HTML'
          })
        });
      } catch (error) {
        console.error('Ошибка отправки данных в Telegram:', error);
      }

      setAppliedPromo(code);
      setPromoDiscount(promoCode.discount);
      showPromoNotification('success', `Промокод "${code}" применен!`, promoCode.discount);
    } else {
      showPromoNotification('error', `Промокод "${code}" недействителен`);
    }
  };

  const handlePeriodChange = (period: '1month' | '3months' | '1year') => {
    setSelectedPeriod(period);
  };

  const handlePurchase = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialData.telegram.trim() || !trialData.source) return;

    setIsSubmittingTrial(true);
    
    try {
      // Получаем информацию о пользователе
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: new Date().toISOString()
      };

      // Формируем сообщение для Telegram
      const message = `🆓 <b>Заявка на тестовый период</b>\n\n` +
        `📱 <b>Telegram:</b> ${trialData.telegram}\n` +
        `📢 <b>Откуда узнали:</b> ${trialData.source}\n\n` +
        `<b>Информация об устройстве:</b>\n` +
        `📱 <b>Устройство:</b> ${deviceInfo.platform}\n` +
        `🌐 <b>Браузер:</b> ${deviceInfo.userAgent.split(' ').slice(-2).join(' ')}\n` +
        `🗣️ <b>Язык:</b> ${deviceInfo.language}\n` +
        `📺 <b>Разрешение:</b> ${deviceInfo.screenResolution}\n` +
        `🕐 <b>Часовой пояс:</b> ${deviceInfo.timezone}\n` +
        `⏰ <b>Время подачи:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
        `<i>VenomVPN Trial System</i>`;

      // Отправляем данные в Telegram
      await fetch(`https://api.telegram.org/bot7929772519:AAEMmZU84D4RuGxqnfaBEwMbl_OX4gbPWSg/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: 8038371412,
          text: message,
          parse_mode: 'HTML'
        })
      });

      showNotification('success', 'Заявка на тестовый период отправлена! Мы свяжемся с вами в ближайшее время.');
      setTrialData({ telegram: '', source: '' });
      setShowTrialForm(false);
    } catch (error) {
      showNotification('error', 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmittingTrial(false);
    }
  };

  const sourceOptions = [
    'YouTube',
    'Telegram',
    'Discord',
    'ВКонтакте',
    'Друзья/знакомые',
    'Поисковые системы',
    'Реклама',
    'Другое'
  ];

  return (
    <section id="pricing" className="section bg-gray-900">
      <PromoNotificationContainer
        notifications={promoNotifications}
        onRemove={removePromoNotification}
      />
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Выберите свой тариф
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Найдите идеальный план для ваших потребностей
          </p>
          
          {/* Period Selector with fixed discount badges */}
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex bg-gray-800 rounded-lg p-1 shadow-md relative">
            <button
              onClick={() => handlePeriodChange('1month')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                selectedPeriod === '1month'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              1 месяц
            </button>
            <button
              onClick={() => handlePeriodChange('3months')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                selectedPeriod === '3months'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              3 месяца
            </button>
            <button
              onClick={() => handlePeriodChange('1year')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                selectedPeriod === '1year'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              1 год
            </button>
            
            {/* Discount badges positioned absolutely */}
            <span 
              className={`absolute -top-2 left-1/3 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full transition-opacity ${
                selectedPeriod === '3months' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              -15%
            </span>
            <span 
              className={`absolute -top-2 left-2/3 transform -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full transition-opacity ${
                selectedPeriod === '1year' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              -30%
            </span>
          </div>

            {/* Дополнительные кнопки */}
            <div className="flex gap-4">
<button
  onClick={() => setIsPromoModalOpen(true)}
  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
>
  {/* Иконка подарка вместо предыдущей SVG иконки */}
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/>
  </svg>
  Промокод
</button>
              
              <button
                onClick={() => setShowTrialForm(!showTrialForm)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Тест на 1 день
              </button>
            </div>
          </div>
        </div>

        {showTrialForm ? (
          <div className="max-w-md mx-auto mb-8">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Тестовый период</h2>
                <p className="text-gray-300">
                  Получите бесплатный доступ на 1 день
                </p>
              </div>

              <form onSubmit={handleTrialSubmit} className="space-y-6">
                <div>
                  <label htmlFor="telegram" className="block text-sm font-medium text-gray-300 mb-2">
                    Ваш Telegram
                  </label>
                  <input
                    type="text"
                    id="telegram"
                    value={trialData.telegram}
                    onChange={(e) => setTrialData(prev => ({ ...prev, telegram: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-green-500 text-white placeholder-gray-400"
                    placeholder="@username или +7XXXXXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="source" className="block text-sm font-medium text-gray-300 mb-2">
                    Откуда вы узнали о нас?
                  </label>
                  <select
                    id="source"
                    value={trialData.source}
                    onChange={(e) => setTrialData(prev => ({ ...prev, source: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-green-500 text-white"
                    required
                  >
                    <option value="">Выберите источник</option>
                    {sourceOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmittingTrial}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingTrial ? 'Отправка...' : 'Получить тест'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTrialForm(false)}
                    className="px-4 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-max">
          {plans.map((plan) => {
            const shouldShowPlan = plan.id === 'cyber-vm' ? selectedPeriod === '1year' : selectedPeriod !== '1year';
            if (!shouldShowPlan) return null;

            return (
            <div
              key={plan.id}
              className={`relative bg-gray-800 border rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${
                plan.id === 'cyber-vm'
                  ? 'border-orange-500 ring-4 ring-orange-500/50 shadow-orange-500/30 bg-gradient-to-br from-gray-800 via-gray-800 to-orange-900/20'
                  : plan.popular
                    ? 'ring-2 ring-orange-500 border-gray-700 hover:shadow-orange-500/20 hover:border-orange-500'
                    : 'border-gray-700 hover:shadow-orange-500/20 hover:border-orange-500'
              }`}
            >
              {plan.id === 'cyber-vm' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    НАВСЕГДА
                  </span>
                </div>
              )}
              {plan.popular && plan.id !== 'cyber-vm' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Популярный
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center text-white mb-6 mx-auto`}>
                  {plan.icon}
                </div>

                <h3 className="text-2xl font-bold text-white text-center mb-4">
                  {plan.name}
                </h3>

                <div className="text-center mb-6">
                  {plan.isLifetime ? (
                    <>
                      <div className="flex items-center justify-center mb-2">
                        <span className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                          {plan.basePrice}₽
                        </span>
                      </div>
                      <p className="text-orange-400 font-bold text-lg">
                        Бесконечная подписка
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-center mb-2">
                        {promoDiscount > 0 && (
                          <span className="text-2xl font-bold text-gray-500 line-through mr-2">
                            {getOriginalPrice(plan.basePrice)}₽
                          </span>
                        )}
                        <span className="text-4xl font-bold text-white">
                          {calculatePrice(plan.basePrice)}₽
                        </span>
                      </div>
                      <p className="text-gray-400">
                        за {getPeriodLabel()}
                      </p>
                      {appliedPromo && promoDiscount > 0 && (
                        selectedPeriod === '3months' || selectedPeriod === '1year'
                      ) && (
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm font-medium">
                            Промокод: {appliedPromo} (-{promoDiscount}%)
                          </span>
                        </div>
                      )}
                      {getDiscount() > 0 && (
                        <p className="text-orange-400 font-medium">
                          Экономия {getDiscount()}%
                        </p>
                      )}
                    </>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(plan)}
                  className="w-full btn btn-primary"
                >
                  Купить
                </button>
              </div>
            </div>
          );
          })}
        </div>
        )}
      </div>

      {selectedPlan && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          plan={selectedPlan}
          period={selectedPeriod}
          price={calculatePrice(selectedPlan.basePrice)}
        />
      )}

      <PromoCodeModal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        onApplyPromo={handleApplyPromo}
      />
    </section>
  );
};

export default PricingSection;
