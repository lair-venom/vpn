import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutVPN from '../components/AboutVPN';
import PricingSection from '../components/PricingSection';
import InstallationGuide from '../components/InstallationGuide';
import DownloadLinks from '../components/DownloadLinks';
import Footer from '../components/Footer';

interface HomePageProps {
  showNotification: (type: 'success' | 'error', message: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ showNotification }) => {
  useEffect(() => {
    document.title = 'VenomVPN - Безопасный доступ в интернет';

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
    <>
      <Header />
      <main>
        <Hero />
        <AboutVPN />
        <PricingSection showNotification={showNotification} />
        <InstallationGuide />
        <DownloadLinks />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
