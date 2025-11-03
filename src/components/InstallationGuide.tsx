import React from 'react';
import { Download, Monitor, Smartphone, Tablet, Settings, CheckCircle, Globe } from 'lucide-react';

const InstallStep: React.FC<{ number: number; title: string; description: string; icon: React.ReactNode }> = ({ 
  number, 
  title, 
  description, 
  icon 
}) => {
  return (
    <div className="flex">
      <div className="mr-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/20 text-orange-500 font-bold text-xl">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <div className="mr-2 text-orange-500">{icon}</div>
          <h3 className="text-xl font-medium text-white">{title}</h3>
        </div>
        <p className="text-gray-400 mb-8">{description}</p>
      </div>
    </div>
  );
};

const InstallationGuide: React.FC = () => {
  return (
    <section id="installation" className="section bg-gray-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 transform skew-x-12 -translate-x-20 hidden lg:block"></div>
      
      <div className="container-custom relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Инструкция по установке</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Следуйте пошаговой инструкции для быстрой и правильной установки нашего VPN сервиса на любое устройство.
          </p>
        </div>

        <div className="lg:w-3/5">
          <InstallStep 
            number={1} 
            title="Скачайте приложение" 
            description="Выберите соответствующую версию VPN клиента для вашего устройства и операционной системы. Загрузите установочный файл с официального сайта."
            icon={<Download className="h-6 w-6" />}
          />

          <InstallStep 
            number={2} 
            title="Установите программу" 
            description="Запустите загруженный установочный файл и следуйте инструкциям установщика. Процесс установки займет всего несколько минут."
            icon={<Monitor className="h-6 w-6" />}
          />

          <InstallStep 
            number={3} 
            title="Настройте приложение" 
            description="После установки откройте приложение и пройдите простую настройку. Указав ваш QR или конфиг файл."
            icon={<Settings className="h-6 w-6" />}
          />

          <InstallStep 
            number={4} 
            title="Подключите VPN" 
            description="Выполните первый запуск вашего VPN."
            icon={<Globe className="h-6 w-6" />}
          />

          <InstallStep 
            number={5} 
            title="Готово к использованию" 
            description="После успешного подключения вы можете безопасно использовать интернет. Индикатор подключения покажет, что ваше соединение защищено."
            icon={<CheckCircle className="h-6 w-6" />}
          />
        </div>

        <div className="mt-12 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-xl font-medium text-white mb-4">Доступно для всех устройств</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center p-3 bg-gray-750 rounded-lg">
              <Monitor className="h-6 w-6 text-orange-500 mr-3" />
              <span className="text-gray-300">Windows, macOS, Linux</span>
            </div>
            <div className="flex items-center p-3 bg-gray-750 rounded-lg">
              <Smartphone className="h-6 w-6 text-orange-500 mr-3" />
              <span className="text-gray-300">iOS, Android</span>
            </div>
            <div className="flex items-center p-3 bg-gray-750 rounded-lg">
              <Tablet className="h-6 w-6 text-orange-500 mr-3" />
              <span className="text-gray-300">Планшеты и другие устройства</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallationGuide;
