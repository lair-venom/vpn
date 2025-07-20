import React, { useState } from 'react';
import { X, Gift, Users, Percent, XCircle } from 'lucide-react';

interface PromoCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPromo: (code: string) => Promise<void>;
}

const PromoCodeModal: React.FC<PromoCodeModalProps> = ({
  isOpen,
  onClose,
  onApplyPromo
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      setIsSubmitting(true);
      await onApplyPromo(promoCode.trim());
      setIsSubmitting(false);
      setPromoCode('');
      onClose();
    }
  };

  const handleNoPromo = () => {
    setPromoCode('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 relative animate-slide-in-bottom">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Промокод</h2>
          <p className="text-gray-300">
            Введите промокод для получения скидки
          </p>
        </div>

        <div className="bg-gray-700 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="bg-orange-500/20 p-2 rounded-lg">
              <Percent className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Скидка 15%</h3>
              <p className="text-sm text-gray-300">
                При вводе промокода вы получаете скидку 15% на тариф
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-orange-500/20 p-2 rounded-lg">
              <Users className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Бонус для друга</h3>
              <p className="text-sm text-gray-300">
                Владелец промокода получает +1 устройство при покупке от 3 месяцев
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="promoCode" className="block text-sm font-medium text-gray-300 mb-2">
              Промокод
            </label>
            <input
              type="text"
              id="promoCode"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400 text-center font-mono text-lg"
              placeholder="Введите промокод"
              maxLength={20}
            />
          </div>

          <button
            type="submit"
            disabled={!promoCode.trim() || isSubmitting}
            className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed mb-3"
          >
            {isSubmitting ? 'Применение...' : 'Применить промокод'}
          </button>
          
          <button
            type="button"
            onClick={handleNoPromo}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-lg transition-colors border border-gray-600 hover:border-gray-500"
          >
            <XCircle className="w-4 h-4" />
            Промокода нету
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromoCodeModal;