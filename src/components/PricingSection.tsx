import React, { useState } from 'react';
import { Check, Shield, Zap, Crown, Server } from 'lucide-react';
import PaymentModal from './ui/PaymentModal';

interface Plan {
  id: string;
  name: string;
  icon: React.ReactNode;
  basePrice: number;
  features: string[];
  popular?: boolean;
  color: string;
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
      'Приор. поддержка',
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
    basePrice: 600,
    color: 'from-orange-500 to-red-600',
    features: [
      'Безлимитный трафик',
      '20 устройств',
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
    return Math.round(basePrice * getPeriodMultiplier());
  };

  const handlePurchase = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  return (
    <section id="pricing" className="section bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Выберите свой тариф
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Найдите идеальный план для ваших потребностей
          </p>
          
          {/* Period Selector with fixed discount badges */}
          <div className="inline-flex bg-gray-800 rounded-lg p-1 shadow-md relative">
            <button
              onClick={() => setSelectedPeriod('1month')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                selectedPeriod === '1month'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              1 месяц
            </button>
            <button
              onClick={() => setSelectedPeriod('3months')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                selectedPeriod === '3months'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              3 месяца
            </button>
            <button
              onClick={() => setSelectedPeriod('1year')}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-800 border border-gray-700 rounded-2xl shadow-lg hover:shadow-orange-500/20 hover:border-orange-500 transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-orange-500' : ''
              }`}
            >
              {plan.popular && (
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
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold text-white">
                      {calculatePrice(plan.basePrice)}₽
                    </span>
                  </div>
                  <p className="text-gray-400">
                    за {getPeriodLabel()}
                  </p>
                  {getDiscount() > 0 && (
                    <p className="text-orange-400 font-medium">
                      Экономия {getDiscount()}%
                    </p>
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
          ))}
        </div>
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
    </section>
  );
};

export default PricingSection;
