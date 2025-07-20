import React from 'react';
import { X, Copy, MessageCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  period: string;
  price: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  planName,
  period,
  price
}) => {
  const [copied, setCopied] = React.useState(false);
  
  const cardNumber = '5469 6000 1768 7856';
  
  const copyCardNumber = async () => {
    try {
      await navigator.clipboard.writeText(cardNumber.replace(/\s/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy card number');
    }
  };

  const getPeriodText = (period: string) => {
    switch (period) {
      case '1month': return '1 месяц';
      case '3months': return '3 месяца';
      case '1year': return '1 год';
      default: return period;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 relative animate-in fade-in-0 zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">

          <h2 className="text-2xl font-bold text-white mb-2">Оплата тарифа</h2>
          <p className="text-gray-300">
            {planName} • {getPeriodText(period)}
          </p>
        </div>

        <div className="bg-gray-700 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-white">{planName}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-300">Период:</span>
            <span className="font-semibold text-white">{getPeriodText(period)}</span>
          </div>
          <div className="border-t border-gray-600 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Итого:</span>
              <span className="text-2xl font-bold text-orange-500">{price}₽</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Реквизиты для оплаты</h3>
          <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
            <p className="text-sm text-gray-300 mb-2">Номер карты Сбербанка:</p>
            <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3 border border-gray-600">
              <span className="font-mono text-lg font-semibold text-white">
                {cardNumber}
              </span>
              <button
                onClick={copyCardNumber}
                className="ml-2 p-2 text-orange-500 hover:bg-gray-700 rounded-lg transition-colors"
                title="Копировать номер карты"
              >
                <Copy size={18} />
              </button>
            </div>
            {copied && (
              <p className="text-sm text-orange-500 mt-2">✓ Номер карты скопирован!</p>
            )}
          </div>
        </div>





        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Информация:</h3>
          <div className="space-y-3">
            <a
              href="https://t.me/@fm666venom"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
</svg>
              Связь с Администратором
            </a>

          </div>
        </div>









        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">После оплаты свяжитесь с нами:</h3>
          <div className="space-y-3">
            <a
              href="https://t.me/venom_vp_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Telegram: @venom_vp_bot
            </a>
            <a
              href="https://discord.gg/eXJMRkupyA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-gray-600 hover:bg-gray-500 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Discord сервер
            </a>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            После оплаты отправьте скриншот чека администратору для активации доступа
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal
