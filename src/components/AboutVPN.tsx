import React from 'react';
import { ShieldCheck, Eye, Zap, Globe, Lock, BarChart3 } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ 
  icon, 
  title, 
  description 
}) => {
  return (
    <div className="card hover:translate-y-[-5px]">
      <div className="mb-4 text-orange-500">{icon}</div>
      <h3 className="text-xl font-medium mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const AboutVPN: React.FC = () => {
  return (
    <section id="about" className="section bg-gray-950">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">О нашем VPN сервисе</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Наш VPN сервис обеспечивает надежную защиту вашей онлайн-активности, 
            предоставляя безопасное и анонимное соединение для комфортного использования интернета.
          </p>
        </div>

        <div id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<ShieldCheck className="h-8 w-8" />}
            title="Максимальная защита" 
            description="РКН больше не испортит вам настроение заблокировав какой либо контент"
          />
          <FeatureCard 
            icon={<Eye className="h-8 w-8" />}
            title="Полная анонимность" 
            description="Скрывайте свой IP-адрес и защищайте вашу личность от слежки и отслеживания."
          />
          <FeatureCard 
            icon={<Zap className="h-8 w-8" />}
            title="Высокая скорость" 
            description="Наши серверы оптимизированы для обеспечения максимальной скорости соединения без задержек."
          />
          <FeatureCard 
            icon={<Globe className="h-8 w-8" />}
            title="Глобальная сеть" 
            description="Доступ к серверам по всему миру позволяет обойти географические ограничения контента."
          />
          <FeatureCard 
            icon={<Lock className="h-8 w-8" />}
            title="Безопасность Wi-Fi" 
            description="Защита на общедоступных Wi-Fi сетях от потенциальных угроз и утечки данных."
          />
          <FeatureCard 
            icon={<BarChart3 className="h-8 w-8" />}
            title="Неограниченный трафик" 
            description="Используйте наш сервис без ограничений по трафику и скорости соединения."
          />
        </div>
      </div>
    </section>
  );
};

export default AboutVPN;