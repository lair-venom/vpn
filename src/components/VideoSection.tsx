import React from 'react';
import Accordion from './ui/Accordion';

const VideoSection: React.FC = () => {
  const tutorials = [
    {
      id: 1,
      title: "Покупка. Как все происходит?",
      content: [
        "После того как вы оставляете заявку на покупку с указанием данных для связи в удобной для вас соц.сети. Наш специалист в кротчайшие сроки связываеться с вами и производится оплата тарифа и дальнейшая настройка клиента.",
      ]
    },
    {
      id: 2,
      title: "Куда обратиться за помощью?",
      content: [
        "При покупке любого из тарифных планов вам будут выданы все соц.сети и контакты для связи. И при возникновении каких либо проблем или же вопросов вы сможете обратиться напрямую к нашему специалисту.",
      ]
    },
    {
      id: 3,
      title: "Hiddify и его проблемы",
      content: [
        "1. Данный клиент очень капризный и порой может выдавать ошибку таймаут. Решение данной проблемы пока не найдено к сожалению и мы не можем повлиять на работоспособность данного клиента так как мы не его разработчики.", 
        "2. Вторая проблема с которой могут столкнуться пользователи Discord это маршрутизации при подключении к голосовому каналу. Данный диагноз можно вылечить включив VPN перейдя с системного прокси (найти режимы можно нажав на иконку ползунка в правом верхнем углу) и включить в настройках Block Advertisements.", 
        "3. Ещё странная вещь с которой я столкнулся это скачивание приложения для Windows и проблема заключалась в том что родной антивирусник выдавал что там вирус странно не правда ли? Когда с офф.сайта вирус... Я предполагаю что это происходит из-за расширения файла. Проблема эта решается так же бредово... просто скачивайте с Microsoft Store.",
      ]
    },
    {
      id: 4,
      title: "Решение проблем с отсутствием интернета Windows",
      content: [
        "Наш VPN использует определенные порты через которые идет трафик и иногда клиент через который идет весь процесс может словить глюк и не вернуть порты в исходное состояние, что и приводит к отсутствию интернета. К сожалению мы не разработчики приложения и не может на это повлиять",
        "1. Скачать файл расположенный ниже",
        "2. Запустить его через PowerShell",
        "После чего порты вернуться в исходное положение и интернет начнет функционировать",
        "",
        "LINK:🔗 Файл: https://drive.google.com/file/d/1-C9cXhVEHWyE9rs4cHWLcVu2dyn1R6v4/view?usp=sharing"
      ]
    },
    {
      id: 5,
      title: "Как настроить VPN",
      content: [
        "Наш VPN построен на VLESS — это легкий транспортный протокол, не сохраняющий состояние, который разделен на inbound и outbound части и может использоваться в качестве моста между клиентом и сервером. И благодаря этому мы можем использовать различные клиенты. Описать кратко как настроить каждый из них у нас нет возможности так как настройки каждого клиента отличаться. И описать каждый нюанс всех клиентов было бы долго и муторно. Наша главная цель это ваш комфорт и при покупке наш специалист поможет подобрать удобный клиент для ваших устройств и настроить его для полноценной работы."
      ]
    }
  ];

  const renderContent = (step: string) => {
    if (step.startsWith('LINK:')) {
      const linkText = step.replace('LINK:', '');
      const parts = linkText.split(': ');
      const text = parts[0];
      const url = parts[1];
      
      return (
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-orange-400 font-medium bg-gray-800 px-4 py-2 rounded-lg border border-orange-500/30 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 cursor-pointer"
        >
          {text}
        </a>
      );
    }
    
    return <span className="text-gray-300 font-medium">{step}</span>;
  };

  return (
    <section id="tutorials" className="section bg-gray-950">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Инструкция</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
           Руководства помогут вам быстро исправить ваши проблемы.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {tutorials.map((tutorial) => (
            <Accordion key={tutorial.id} title={tutorial.title}>
              <div className="space-y-4 py-4">
                {tutorial.content.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4 p-3 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {renderContent(step)}
                  </div>
                ))}
              </div>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;