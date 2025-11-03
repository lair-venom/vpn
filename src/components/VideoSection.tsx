import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import FAQModal from './ui/FAQModal';

const VideoSection: React.FC = () => {
  const [isFAQOpen, setIsFAQOpen] = useState(false);

  return (
    <>
      <section id="tutorials" className="section bg-gray-950">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Информация</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Руководства помогут вам быстро исправить ваши проблемы.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setIsFAQOpen(true)}
              className="w-full group bg-gradient-to-r from-gray-800 to-gray-700 hover:from-orange-500 hover:to-orange-600 border-2 border-gray-700 hover:border-orange-500 rounded-2xl p-8 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/20"
            >
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-orange-500/20 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300">
                  <HelpCircle className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Часто задаваемые вопросы
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                    Нажмите, чтобы открыть FAQ и найти решение вашей проблемы
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <FAQModal isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />
    </>
  );
};

export default VideoSection;
