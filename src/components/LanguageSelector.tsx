import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  isFixed?: boolean;
}

const languages = [
  { code: 'es', name: 'Español', flag: '🇪🇸', gradient: 'from-yellow-400 to-red-500' },
  { code: 'en', name: 'English', flag: '🇺🇸', gradient: 'from-blue-400 to-red-400' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', gradient: 'from-yellow-300 to-black' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isFixed = true }) => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [hoveredLang, setHoveredLang] = useState('');

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setSelectedLang(code);
  };

  const getHoverTransform = () => {
    const index = languages.findIndex(lang => lang.code === hoveredLang);
    if (index === -1) return 'translateX(-100%)';
    return `translateX(${index * 100}%)`;
  };

  const containerClasses = isFixed 
    ? "absolute left-1/2 -translate-x-1/2 flex justify-center z-0"
    : "relative";

  const selectorClasses = isFixed
    ? "relative flex bg-white/90 dark:bg-[var(--color-fountain-blue-900)]/90 rounded-2xl p-1 shadow-xl border border-[var(--color-fountain-blue-200)] dark:border-[var(--color-fountain-blue-700)] backdrop-blur-sm w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] xl:w-[440px] transition-all duration-300 hover:shadow-2xl"
    : "relative flex bg-white/80 dark:bg-[var(--color-fountain-blue-900)]/80 rounded-xl p-1 shadow-lg border border-[var(--color-fountain-blue-200)] dark:border-[var(--color-fountain-blue-700)] backdrop-blur-sm w-full max-w-xs transition-all duration-300";

  return (
    <div className={containerClasses}>
      <div 
        className={selectorClasses}
        onMouseLeave={() => setHoveredLang('')}
      >
        {/* Hover indicator que se mueve horizontalmente */}
        <div 
          className={`
            absolute top-1 left-1 w-1/3 h-[calc(100%-8px)] rounded-xl
            transition-all duration-500 ease-out pointer-events-none z-0
            bg-gradient-to-r from-[var(--color-fountain-blue-100)] to-[var(--color-fountain-blue-200)]
            dark:from-[var(--color-fountain-blue-800)] dark:to-[var(--color-fountain-blue-700)]
            ${hoveredLang ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
          `}
          style={{
            transform: getHoverTransform()
          }}
        />
        
        {/* Botones de idiomas */}
        {languages.map((language, index) => (
          <div
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            onMouseEnter={() => setHoveredLang(language.code)}
            className={`
              relative z-10 flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-xl cursor-pointer 
              transition-all duration-500 text-center group
              ${selectedLang === language.code 
                ? `bg-gradient-to-r ${language.gradient} text-white shadow-lg font-semibold` 
                : 'text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)] hover:text-[var(--color-fountain-blue-600)] dark:hover:text-[var(--color-fountain-blue-200)]'
              }
            `}
          >
            {/* Content */}
            <div className="relative flex items-center justify-center space-x-1 sm:space-x-2">
              {/* Flag */}
              <span className="text-base sm:text-lg filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                {language.flag}
              </span>
              
              {/* Language name */}
              <span className={`font-medium text-xs sm:text-sm transition-all duration-300 ${
                selectedLang === language.code ? 'text-white' : 'text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-100)]'
              }`}>
                {language.name}
              </span>
              
              {/* Selection indicator */}
              {selectedLang === language.code && (
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full shadow-sm"></div>
              )}
            </div>
            
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
