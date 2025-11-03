import React from 'react';
import DownloadCard from './ui/DownloadCard';
import { Monitor, Smartphone, Globe, ShieldCheck } from 'lucide-react';

const DownloadLinks: React.FC = () => {
  return (
    <section id="download" className="section bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Список рекомендуемых VPN клиентов</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Выберите подходящую версию VPN клиента для вашего устройства и начните безопасно пользоваться интернетом уже сегодня.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DownloadCard
            title="VPN для Windows/Linux"
            icon={<Monitor className="h-10 w-10" />}
            description={[
              { name: "Furious", url: "https://github.com/LorenEteval/Furious/releases/tag/0.5.1", recommended: true },
              { name: "NekoRay", url: "https://en.nekoray.org/download/", recommended: true },
              { name: "Invisible Man - XRay", url: "https://github.com/InvisibleManVPN/InvisibleMan-XRayClient/releases/tag/v3.2.5", recommended: true },
              { name: "Hiddify", url: "https://hiddify.com", recommended: false }
            ]}
            os="Windows 10/11"
          />
          <DownloadCard
            title="VPN для macOS"
            icon={<Monitor className="h-10 w-10" />}
            description={[
              { name: "v2RayTun", url: "https://apps.apple.com/ru/app/v2raytun/id6476628951", recommended: true },
              { name: "V2Box", url: "https://apps.apple.com/ru/app/v2box-v2ray-client/id6446814690", recommended: true }
            ]}
            os="macOS 10.15+"
          />
          <DownloadCard
            title="VPN для Android"
            icon={<Smartphone className="h-10 w-10" />}
            description={[
              { name: "v2rayNG", url: "https://en.v2rayng.org/download/", recommended: true },
              { name: "v2RayTun", url: "https://play.google.com/store/search?q=v2RayTun&c=apps&hl=ru", recommended: true },
              { name: "Hiddify", url: "https://play.google.com/store/apps/details?id=app.hiddify.com&hl=ru", recommended: false }
            ]}
            os="Android 6.0+"
          />
          <DownloadCard
            title="VPN для iOS"
            icon={<Smartphone className="h-10 w-10" />}
            description={[
              { name: "v2RayTun", url: "https://apps.apple.com/ru/app/v2raytun/id6476628951", recommended: true },
              { name: "Streisand", url: "https://apps.apple.com/ru/app/streisand/id6450534064", recommended: true },
              { name: "v2box", url: "https://apps.apple.com/ru/app/v2box-v2ray-client/id6446814690", recommended: true },
              { name: "ShadowRocket", url: "https://apps.apple.com/ru/app/shadowrocket/id932747118", recommended: true }
            ]}
            os="iOS 13.0+"
          />
        </div>
      </div>
    </section>
  );
};

export default DownloadLinks;