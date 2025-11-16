import React from 'react';
import { X, Copy, MessageCircle, CreditCard } from 'lucide-react';

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
  
  const cardNumber = '5469600017687856';
  
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
            <p className="text-sm text-gray-300 mb-2 flex items-center gap-2">
              <CreditCard size={16} />
              Номер карты Сбербанка:
            </p>
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
              href="https://t.me/fm666venom"
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
          <h3 className="text-lg font-semibold text-white mb-3">После оплаты будет полезно:</h3>
          <div className="space-y-3">
            <a
              href="https://t.me/venom_vp_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gray-600 hover:bg-gray-500 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.142-.368.361-.753.361-.498 0-.422-.281-.592-.962l-1.313-4.308-3.053-.46c-.66-.087-.68-.302-.144-.47l11.871-4.573c.52-.197.966.064.805 1.07z"/>
              </svg>
              Telegram Bot
            </a>
            <a
              href="https://discord.gg/eXJMRkupyA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gray-600 hover:bg-gray-500 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 127.14 96.36">
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a77.15,77.15,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.22,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.75,80.21h0C129.78,55.03,122.766,31.7,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60.55,31,53.88s5-11.8,11.43-11.8c6.47,0,11.68,5.05,11.48,11.8C54.10,60.55,48.9,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60.55,73.25,53.88s5-11.8,11.44-11.8c6.47,0,11.67,5.05,11.48,11.8C95.34,60.55,90.14,65.69,84.69,65.69Z"/>
              </svg>
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
