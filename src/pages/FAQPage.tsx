import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ChevronRight } from 'lucide-react';
import ImageModal from '../components/ui/ImageModal';

interface FAQItem {
  id: number;
  title: string;
  description: string;
  steps: string[];
  images?: string[];
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    title: "Покупка. Как все происходит",
    description: "Процесс покупки и активации VPN",
    steps: [
      "Выбирайте подходящий вам тариф и оплачивайте его.",
      "После оплаты свяжитесь с Администратором удобным способом: Discord или Telegram (ссылки находятся в блоке оплаты).",
      "Предоставьте чек об оплате.",
      "В течение 5 минут вам будет выдан полный доступ и данные для вашего VPN."
    ]
  },
  {
    id: 2,
    title: "Куда обратиться за помощью",
    description: "Где получить поддержку и информацию",
    steps: [
      "В блоке оплаты находятся ссылки на наш Telegram бот, где предоставлена информация о вашем VPN.",
      "В боте приходят различные полезные уведомления в случае тех.работ.",
      "На нашем Discord сервере вы можете обратиться к специалисту, создав тикет в канале vpn-venom.",
      "Поддержка доступна 24/7."
    ]
  },
  {
    id: 3,
    title: "Почему появился лимит на подключаемые устройства",
    description: "Объяснение ограничений по устройствам",
    steps: [
      "Предотвращение злоупотреблений – без ограничений один аккаунт могли бы использовать сотни пользователей, что увеличивает нагрузку на серверы и снижает скорость для остальных.",
      "Оптимизация нагрузки – VPN-провайдеры ограничивают число одновременных подключений, чтобы обеспечить стабильную работу серверов и высокую скорость для всех клиентов.",
      "Безопасность – если аккаунт утечет, злоумышленники не смогут создать неограниченное число подключений."
    ]
  },
  {
    id: 4,
    title: "Hiddify и его проблемы",
    description: "Известные проблемы клиента Hiddify и их решения",
    steps: [
      "Проблема таймаута: Данный клиент очень капризный и порой может выдавать ошибку таймаут. Решение данной проблемы пока не найдено, так как мы не являемся разработчиками клиента.",
      "Проблема с Discord: Маршрутизация при подключении к голосовому каналу. Решение: включите VPN, перейдите с системного прокси (найти режимы можно нажав на иконку ползунка в правом верхнем углу) и включите в настройках Block Advertisements.",
      "Проблема с антивирусом Windows: При скачивании приложения антивирусник может выдавать предупреждение о вирусе. Это происходит из-за расширения файла. Решение: скачивайте приложение из Microsoft Store."
    ]
  },
  {
    id: 5,
    title: "Решение проблем с отсутствием интернета Windows",
    description: "Что делать, если пропал интернет после использования VPN",
    steps: [
      "Наш VPN использует определенные порты, через которые идет трафик.",
      "Иногда клиент может не вернуть порты в исходное состояние, что приводит к отсутствию интернета.",
      "Скачайте специальный файл для восстановления портов: https://drive.google.com/file/d/1-C9cXhVEHWyE9rs4cHWLcVu2dyn1R6v4/view?usp=sharing",
      "Запустите файл через PowerShell от имени администратора.",
      "После выполнения скрипта порты вернутся в исходное положение, и интернет заработает."
    ]
  },
  {
    id: 6,
    title: "Как настроить VPN",
    description: "Общая информация о настройке VPN клиентов",
    steps: [
      "Наш VPN построен на протоколе VLESS – легком транспортном протоколе, который может использоваться с различными клиентами.",
      "Настройки каждого клиента отличаются, поэтому универсальной инструкции не существует.",
      "При покупке наш специалист поможет подобрать удобный клиент для ваших устройств и настроит его для полноценной работы.",
      "Вы получите полную поддержку при первой настройке."
    ]
  }
];

const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Назад на главную
            </button>

            <h1 className="text-4xl font-bold text-white mb-4">Информация и помощь</h1>
            <p className="text-xl text-gray-300">
              Здесь вы найдете ответы на часто задаваемые вопросы и решения распространенных проблем
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-orange-500 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{item.title}</h2>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-orange-500 flex-shrink-0" />
                </div>

                <div className="space-y-3">
                  {item.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-750 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 flex-1">{step}</p>
                    </div>
                  ))}
                </div>

                {item.images && item.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {item.images.map((image, index) => (
                      <div
                        key={index}
                        className="cursor-pointer rounded-lg overflow-hidden border-2 border-gray-600 hover:border-orange-500 transition-colors"
                        onClick={() => setSelectedImage(image)}
                      >
                        <img
                          src={image}
                          alt={`${item.title} - изображение ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 text-center">
            <MessageCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Не нашли ответ?</h3>
            <p className="text-gray-300 mb-6">
              Если вы не нашли решение своей проблемы, свяжитесь с нами напрямую
            </p>
            <a
              href="https://t.me/fm666venom"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default FAQPage;
