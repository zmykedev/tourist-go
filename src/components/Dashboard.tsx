import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

const images = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80", // Torres del Paine
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80", // Valle de la Luna
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80", // San Pedro de Atacama
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80", // Patagonia
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80", // Viña del Mar
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80", // Santiago
];

const destinations = [
  {
    key: "torresDelPaine",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80"
  },
  {
    key: "valleDeLaLuna",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80"
  },
  {
    key: "sanPedroDeAtacama",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&q=80"
  },
  {
    key: "valleDelElqui",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80"
  }
];

const experiences = [
  { key: "patagonia", icon: "🏔️" },
  { key: "atacama", icon: "🌙" },
  { key: "wineRoute", icon: "🍷" },
  { key: "mapuche", icon: "🏺" }
];

const Dashboard: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-fountain-blue-50)] to-[var(--color-fountain-blue-100)] dark:from-[var(--color-fountain-blue-900)] dark:to-[var(--color-fountain-blue-800)] py-12 px-4">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-fountain-blue-600)] to-[var(--color-fountain-blue-400)] mb-6 tracking-tight">
          {t('dashboard.hero.title')}
        </h1>
        <p className="text-xl text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)] mb-8 max-w-3xl mx-auto">
          {t('dashboard.hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
            {t('dashboard.hero.reserveButton')}
          </button>
          <button className="px-8 py-4 bg-white/80 hover:bg-white text-[var(--color-fountain-blue-700)] rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
            {t('dashboard.hero.exploreButton')}
          </button>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] mb-8">
          {t('dashboard.carousel.title')}
        </h2>
        <div className="w-full relative group">
          <div className="overflow-hidden rounded-3xl shadow-2xl border-4 border-[var(--color-fountain-blue-200)] dark:border-[var(--color-fountain-blue-700)]">
            <img
              src={images[current]}
              alt={`${t('dashboard.carousel.destination')} ${current + 1}`}
              className="w-full h-80 md:h-[32rem] object-cover transition-all duration-700 scale-105 group-hover:scale-110"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{t('dashboard.carousel.destination')} {current + 1}</h3>
              <p className="text-lg opacity-90">{t('dashboard.carousel.discoverMagic')}</p>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 dark:bg-[var(--color-fountain-blue-900)]/80 hover:bg-white dark:hover:bg-[var(--color-fountain-blue-800)] text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] rounded-full p-3 shadow-lg transition-all duration-200 z-10"
            aria-label={t('common.navigation.previous')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 dark:bg-[var(--color-fountain-blue-900)]/80 hover:bg-white dark:hover:bg-[var(--color-fountain-blue-800)] text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] rounded-full p-3 shadow-lg transition-all duration-200 z-10"
            aria-label={t('common.navigation.next')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                  current === idx
                    ? "bg-[var(--color-fountain-blue-500)] border-[var(--color-fountain-blue-700)] shadow-lg"
                    : "bg-white/70 border-[var(--color-fountain-blue-200)] dark:bg-[var(--color-fountain-blue-800)]"
                }`}
                aria-label={`${t('common.navigation.goToDestination')} ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] mb-12">
          {t('dashboard.destinations.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div key={index} className="bg-white/90 dark:bg-[var(--color-fountain-blue-900)]/90 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={t(`dashboard.destinations.${destination.key}.name`)}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] mb-2">
                  {t(`dashboard.destinations.${destination.key}.name`)}
                </h3>
                <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)] mb-3">
                  {t(`dashboard.destinations.${destination.key}.description`)}
                </p>
                <div className="flex justify-between items-center text-xs text-[var(--color-fountain-blue-500)] dark:text-[var(--color-fountain-blue-400)]">
                  <span className="bg-[var(--color-fountain-blue-100)] dark:bg-[var(--color-fountain-blue-800)] px-2 py-1 rounded-full">
                    {t(`dashboard.destinations.${destination.key}.region`)}
                  </span>
                  <span>{t('dashboard.destinations.bestTime')}: {t(`dashboard.destinations.${destination.key}.bestTime`)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experiences Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] mb-12">
          {t('dashboard.experiences.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((experience, index) => (
            <div key={index} className="bg-gradient-to-br from-[var(--color-fountain-blue-200)] to-[var(--color-fountain-blue-100)] dark:from-[var(--color-fountain-blue-800)] dark:to-[var(--color-fountain-blue-700)] rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-4xl mb-4">{experience.icon}</div>
              <h3 className="text-xl font-bold text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] mb-3">
                {t(`dashboard.experiences.${experience.key}.title`)}
              </h3>
              <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)] mb-4">
                {t(`dashboard.experiences.${experience.key}.description`)}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--color-fountain-blue-500)] dark:text-[var(--color-fountain-blue-400)] font-medium">
                  {t('dashboard.experiences.duration')}: {t(`dashboard.experiences.${experience.key}.duration`)}
                </span>
                <button className="px-4 py-2 bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] text-white rounded-lg text-sm font-medium transition-all duration-300">
                  {t('dashboard.experiences.reserve')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] mb-12">
          {t('dashboard.whyChooseUs.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/90 dark:bg-[var(--color-fountain-blue-900)]/90 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-[var(--color-fountain-blue-500)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] mb-3">
              {t('dashboard.whyChooseUs.localDrivers.title')}
            </h3>
            <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
              {t('dashboard.whyChooseUs.localDrivers.description')}
            </p>
          </div>
          
          <div className="bg-white/90 dark:bg-[var(--color-fountain-blue-900)]/90 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-[var(--color-fountain-blue-500)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] mb-3">
              {t('dashboard.whyChooseUs.flexibility.title')}
            </h3>
            <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
              {t('dashboard.whyChooseUs.flexibility.description')}
            </p>
          </div>
          
          <div className="bg-white/90 dark:bg-[var(--color-fountain-blue-900)]/90 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-[var(--color-fountain-blue-500)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] mb-3">
              {t('dashboard.whyChooseUs.security.title')}
            </h3>
            <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
              {t('dashboard.whyChooseUs.security.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
