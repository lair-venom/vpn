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
  
  const cardNumber = '2202 2004 2511 7155';
  
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
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Оплата тарифа</h2>
          <p className="text-gray-300">
            {planName} • {getPeriodText(period)}
          </p>
        </div>

        <div className="bg-gray-700 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-300">Тариф:</span>
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
