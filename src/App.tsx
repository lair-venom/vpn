import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutVPN from './components/AboutVPN';
import PricingSection from './components/PricingSection';
import InstallationGuide from './components/InstallationGuide';
import VideoSection from './components/VideoSection';
import DownloadLinks from './components/DownloadLinks';
import Footer from './components/Footer';
import NotificationContainer from './components/ui/NotificationContainer';
import { useNotification } from './hooks/useNotification';

function App() {
  const { notifications, showNotification, removeNotification } = useNotification();

  useEffect(() => {
    document.title = 'Venom VPN - Безопасный доступ в интернет';
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NotificationContainer
        notifications={notifications}
        onRemove={removeNotification}
      />
      <Header />
      <main>
        <Hero />
        <AboutVPN />
        <PricingSection showNotification={showNotification} />
        <InstallationGuide />
        <VideoSection />
        <DownloadLinks />
      </main>
      <Footer />
    </div>
  );
}

export default App;
