import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    console.log('Initial saved theme:', savedTheme);
    
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('System prefers dark mode:', systemPreference);

    if (savedTheme) return savedTheme;
    return systemPreference ? 'dark' : 'light';
  });

  useEffect(() => {
    console.log('Theme changed to:', theme);
    // Update class on document.documentElement
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      console.log('Added dark class, current classes:', document.documentElement.className);
    } else {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class, current classes:', document.documentElement.className);
    }
    // Save to localStorage
    localStorage.setItem('theme', theme);
    console.log('Saved theme to localStorage:', theme);
  }, [theme]);

  const toggleTheme = () => {
    console.log('Toggle theme called, current theme:', theme);
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      console.log('Setting new theme to:', newTheme);
      return newTheme;
    });
  };

  console.log('ThemeProvider rendering with theme:', theme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    console.error('useTheme must be used within a ThemeProvider');
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  console.log('useTheme hook called, current theme:', context.theme);
  return context;
}; 