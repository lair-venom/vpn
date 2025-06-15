import React, { useState } from 'react';
import { Check } from 'lucide-react';
import PurchaseModal from './ui/PurchaseModal';
import { NotificationType } from './ui/Notification';

interface PricingSectionProps {
  showNotification: (type: NotificationType, message: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ showNotification }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    duration: string;
    price: number;
    period: string;
  } | null>(null);

  const plans = [
    {
      duration: '1 месяц',
      price: 150,
      period: '1month',
      features: [
        'Безлимитный трафик',
        'Высокая скорость',
        'Поддержка 24/7',
        'Все устройства',
        'Скидка отсутствует'
      ]
    },
    {
      duration: '3 месяца',
      price: 350,
      period: '3months',
      features: [
        'Безлимитный трафик',
        'Максимальная скорость',
        'Приоритетная поддержка',
        'Все устройства',
        'Скидка 22%'
      ]
    },
    {
      duration: '1 год',
      price: 800,
      period: '1year',
      features: [
        'Безлимитный трафик',
        'Максимальная скорость',
        'VIP поддержка',
        'Все устройства',
        'Скидка 55%'
      ]
    }
  ];

  const handlePurchase = (plan: typeof plans[0]) => {
    setSelectedPlan({
      duration: plan.duration,
      price: plan.price,
      period: plan.period
    });
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" className="section bg-gray-950">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Тарифные планы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Выберите подходящий тарифный план и начните пользоваться безопасным и быстрым VPN уже сегодня
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={index} className="pricing-card">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">{plan.duration}</h3>
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  {plan.price} ₽
                </div>
                <p className="text-gray-400">за период</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-orange-500 mr-3" />
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
          ))}
        </div>
      </div>

      <PurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
        showNotification={showNotification}
      />
    </section>
  );
};

export default PricingSection;