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
          <h3 className="text-lg font-semibold text-white mb-3">После оплаты свяжитесь с нами:</h3>
          <div className="space-y-3">
            <a
              href="https://t.me/venom_vp_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/></svg>
              Telegram: @venom_vp_bot
            </a>
            <a
              href="https://discord.gg/eXJMRkupyA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-gray-600 hover:bg-gray-500 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg>
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
