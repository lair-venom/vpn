import React, { useState } from 'react';
import { X, HelpCircle, Download, ExternalLink, MessageCircle, Search } from 'lucide-react';
import ImageModal from './ImageModal';

interface FAQItem {
  id: number;
  question: string;
  answer: string[];
  images?: string[];
  downloadLink?: {
    url: string;
    name: string;
  };
}

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Покупка. Как все происходит",
      images: [
    "",
    "",
  ],
      answer: [
        "Выбирайте подходящий вам тариф и оплачивайте его. После того как вы оплатили вам необходимо связаться с Администратором удобным для вас способом Discord или Telegram (ссылки находятся в блоке оплаты, где указан номер карты) и предоставить чек об оплате.",
        "Далее в течение 5 минут вам будет выдан полный доступ и данные для вашего VPN."
      ]
    },
    {
      id: 2,
      question: "Куда обратиться за помощью",
      answer: [
        "В блоке оплаты находятся ссылки на нашего Telegram бота в котором предоставлена информация связанная с вашим VPN а так же приходят различные полезные уведомления в случаи тех.работ.",
        "Так же в блоке оплаты есть ссылка на наш Discord сервер и при возникновении каких либо проблем или же вопросов вы сможете обратиться напрямую к нашему специалисту создав тикет в канале vpn-venom."
      ]
    },
    {
      id: 3,
      question: "Почему появился лимит на подключаемые устройства",
      answer: [
        "1. Предотвращение злоупотреблений – без ограничений один аккаунт могли бы использовать сотни пользователей, что увеличивает нагрузку на серверы и снижает скорость для остальных.",
        "2. Оптимизация нагрузки – VPN-провайдеры ограничивают число одновременных подключений, чтобы обеспечить стабильную работу серверов и высокую скорость для всех клиентов.",
        "3. Безопасность – если аккаунт утечет, злоумышленники не смогут создать неограниченное число подключений."
      ]
    },
    {
      id: 4,
      question: "Hiddify и его проблемы",
      answer: [
        "1. Данный клиент очень капризный и порой может выдавать ошибку таймаут. Решение данной проблемы пока не найдено к сожалению и мы не можем повлиять на работоспособность данного клиента так как мы не его разработчики.",
        "2. Вторая проблема с которой могут столкнуться пользователи Discord это маршрутизации при подключении к голосовому каналу. Данный диагноз можно вылечить включив VPN перейдя с системного прокси (найти режимы можно нажав на иконку ползунка в правом верхнем углу) и включить в настройках Block Advertisements.",
        "3. Ещё странная вещь с которой я столкнулся это скачивание приложения для Windows и проблема заключалась в том что родной антивирусник выдавал что там вирус странно не правда ли? Когда с офф.сайта вирус... Я предполагаю что это происходит из-за расширения файла. Проблема эта решается так же бредово... просто скачивайте с Microsoft Store."
      ]
    },
    {
      id: 5,
      question: "Решение проблем с отсутствием интернета Windows",
      answer: [
        "Наш VPN использует определенные порты через которые идет трафик и иногда клиент через который идет весь процесс может словить глюк и не вернуть порты в исходное состояние, что и приводит к отсутствию интернета. К сожалению мы не разработчики приложения и не может на это повлиять",
        "1. Скачать файл расположенный ниже",
        "2. Запустить его через PowerShell",
        "После чего порты вернуться в исходное положение и интернет начнет функционировать"
      ],
      downloadLink: {
        url: "https://drive.google.com/file/d/1-C9cXhVEHWyE9rs4cHWLcVu2dyn1R6v4/view?usp=sharing",
        name: "Файл исправления портов"
      }
    },
    {
      id: 6,
      question: "Как настроить VPN",
      answer: [
        "Наш VPN построен на VLESS — это легкий транспортный протокол, не сохраняющий состояние, который разделен на inbound и outbound части и может использоваться в качестве моста между клиентом и сервером.",
        "И благодаря этому мы можем использовать различные клиенты. Описать кратко как настроить каждый из них у нас нет возможности так как настройки каждого клиента отличаться.",
        "И описать каждый нюанс всех клиентов было бы долго и муторно. Наша главная цель это ваш комфорт и при покупке наш специалист поможет подобрать удобный клиент для ваших устройств и настроить его для полноценной работы."
      ]
    }
  ];

  const filteredFAQ = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-4xl w-full h-[90vh] flex flex-col relative border border-gray-700 shadow-2xl">
          <div className="flex-shrink-0 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 p-6">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-full"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Часто задаваемые вопросы</h2>
                <p className="text-gray-400">Найдите ответы на популярные вопросы</p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по FAQ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ scrollBehavior: 'smooth' }}>
            {filteredFAQ.length > 0 ? (
              filteredFAQ.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-700/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600/50 hover:border-orange-500/50 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-start gap-3">
                    <span className="text-orange-500 mt-1 flex-shrink-0">{item.id}.</span>
                    <span>{item.question}</span>
                  </h3>

                  <div className="space-y-3 ml-8">
                    {item.answer.map((paragraph, index) => (
                      <p key={index} className="text-gray-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}

                    {item.images && item.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {item.images.map((image, index) => (
                          <div
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className="relative group cursor-pointer overflow-hidden rounded-lg border border-gray-600 hover:border-orange-500 transition-all duration-300"
                          >
                            <img
                              src={image}
                              alt={`Screenshot ${index + 1}`}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                              <ExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.downloadLink && (
                      <a
                        href={item.downloadLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-4 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        <Download className="w-5 h-5" />
                        {item.downloadLink.name}
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">По вашему запросу ничего не найдено</p>
              </div>
            )}
          </div>

          <div className="flex-shrink-0 bg-gradient-to-r from-gray-800 to-gray-900 border-t border-gray-700 p-6">
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
              <p className="text-gray-300 text-center mb-3">
                Не нашли решение вашей проблемы?
              </p>
              <a
                href="https://t.me/fm666venom"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                Связаться с администратором
              </a>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default FAQModal;
