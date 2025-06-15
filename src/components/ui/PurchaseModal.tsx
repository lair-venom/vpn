import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { NotificationType } from './Notification';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    duration: string;
    price: number;
    period: string;
  } | null;
  showNotification: (type: NotificationType, message: string) => void;
}

type ContactMethod = 'discord' | 'telegram' | 'whatsapp' | 'vk';

const contactMethods = [
  { value: 'discord', label: 'Discord', placeholder: 'Например: User#1234' },
  { value: 'telegram', label: 'Telegram', placeholder: 'Например: @username или +7XXXXXXXXXX' },
  { value: 'whatsapp', label: 'WhatsApp', placeholder: 'Например: +7XXXXXXXXXX' },
  { value: 'vk', label: 'ВКонтакте', placeholder: 'Например: vk.com/username или ID' }
];

const PurchaseModal: React.FC<PurchaseModalProps> = ({ isOpen, onClose, plan, showNotification }) => {
  const [contactMethod, setContactMethod] = useState<ContactMethod>('discord');
  const [contactData, setContactData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedMethod = contactMethods.find(method => method.value === contactMethod);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close dropdown when modal closes
  useEffect(() => {
    if (!isOpen) {
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan || !contactData.trim()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://discord.com/api/webhooks/1327359111934902354/_CzwEXXkAfZCNHm4FkNqx4WwCwKgVty59mwGeIPQby8KYV0z098lQVaVJ-j_1YEOgQ-A', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: null,
          embeds: [{
            title: '🛒 Новая заявка на покупку VPN',
            color: 0xff9d66,
            fields: [
              {
                name: 'Способ связи',
                value: selectedMethod?.label || contactMethod,
                inline: true
              },
              {
                name: 'Контактные данные',
                value: contactData,
                inline: true
              },
              {
                name: 'Тариф',
                value: plan.duration,
                inline: true
              },
              {
                name: 'Сумма',
                value: `${plan.price} ₽`,
                inline: true
              }
            ],
            timestamp: new Date().toISOString()
          }]
        })
      });

      if (response.ok) {
        showNotification('success', 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
        onClose();
        setContactData('');
        setContactMethod('discord');
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      showNotification('error', 'Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setContactData('');
    setContactMethod('discord');
    setIsDropdownOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 md:p-8 max-w-md w-full relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-white pr-8">Оформление заказа</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div ref={dropdownRef}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Способ связи
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 text-white flex items-center justify-between hover:bg-gray-650 transition-colors"
              >
                <span>{selectedMethod?.label}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-xl z-20 overflow-hidden">
                  {contactMethods.map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      onClick={() => {
                        setContactMethod(method.value as ContactMethod);
                        setIsDropdownOpen(false);
                        setContactData('');
                      }}
                      className={`w-full px-4 py-3 text-left text-white hover:bg-gray-600 transition-colors ${
                        contactMethod === method.value ? 'bg-gray-600' : ''
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="contactData" className="block text-sm font-medium text-gray-300 mb-2">
              Ваши контактные данные
            </label>
            <input
              type="text"
              id="contactData"
              value={contactData}
              onChange={(e) => setContactData(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400"
              placeholder={selectedMethod?.placeholder}
              required
            />
          </div>

          {plan && (
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Тариф:</span>
                <span className="font-medium text-white">{plan.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Сумма:</span>
                <span className="font-medium text-orange-500">{plan.price} ₽</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseModal;