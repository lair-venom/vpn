import React from 'react';
import { Shield, Lock, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Безопасный интернет с нашим <span className="text-orange-500">VPN</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Защитите свою приватность, разблокируйте контент и обеспечьте безопасное соединение где бы вы ни находились.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#download" className="btn btn-primary">
                ▼
              </a>
              <a href="#installation" className="btn btn-outline">
                Инструкция по установке
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
              <div className="relative bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500/20 p-3 rounded-lg">
                      <Shield className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Полная защита</h3>
                      <p className="text-gray-400">Шифрование высшего уровня для ваших данных</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500/20 p-3 rounded-lg">
                      <Lock className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Анонимность</h3>
                      <p className="text-gray-400">Скрывайте IP-адрес и оставайтесь анонимным</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-500/20 p-3 rounded-lg">
                      <Globe className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Доступ везде</h3>
                      <p className="text-gray-400">Обход географических ограничений контента</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;