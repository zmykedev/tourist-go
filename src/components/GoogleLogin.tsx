import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { API_ENDPOINTS } from '../config/api';

const GoogleLogin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { checkAuth, user } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      console.log('handleCallback iniciado');
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const name = params.get('name');
      const email = params.get('email');
      
      console.log('Parámetros recibidos:', { token: !!token, name, email });
      
      if (token && name && email) {
        console.log('Credenciales de Google recibidas, guardando token...');
        try {
          // Store token
          localStorage.setItem('token', token);
          console.log('Token guardado en localStorage');
          
          // Actualizar el estado de autenticación
          await checkAuth();
          
          // Redirigir según el rol del usuario
          if (user?.role === 'tourist') {
            navigate('/tourist-request', { replace: true });
          } else if (user?.role === 'driver') {
            navigate('/driver-registration', { replace: true });
          } else {
            // Si no tiene rol, ir a la página de selección
            navigate('/', { replace: true });
          }
        } catch (error) {
          console.error('Error en el proceso de autenticación:', error);
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
        }
      } else {
        console.log('No hay parámetros de autenticación');
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          console.log('Token encontrado, verificando...');
          await checkAuth();
        }
      }
      setIsLoading(false);
    };

    handleCallback();
  }, [location, navigate, checkAuth, user]);

  const handleLogin = () => {
    console.log('Iniciando login con Google...');
    const googleAuthUrl = API_ENDPOINTS.AUTH.GOOGLE;
    console.log('Redirigiendo a:', googleAuthUrl);
    window.location.href = googleAuthUrl;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent rounded-full shadow-lg dark:border-[var(--color-fountain-blue-400)]"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
      <div className="flex-1 flex flex-col">
        <div className="absolute top-4 right-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log('GoogleLogin: Toggle theme button clicked, current theme:', theme);
              toggleTheme();
            }}
            className=" cursor-pointer p-2 rounded-full bg-white dark:bg-[var(--color-fountain-blue-800)] shadow-lg hover:shadow-xl transform transition-all duration-200 hover:ring-2 hover:ring-[var(--color-fountain-blue-300)] dark:hover:ring-[var(--color-fountain-blue-600)]"
          >
            {theme === 'dark' ? (
              <svg className="w-6 h-6 text-[var(--color-fountain-blue-400)] hover:text-[var(--color-fountain-blue-500)] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-[var(--color-fountain-blue-600)] hover:text-[var(--color-fountain-blue-700)] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </motion.button>
        </div>
        

        <motion.main
          className="flex-1 p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="max-w-md w-full space-y-8"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <motion.h2 
                  className="mt-6 text-center text-4xl font-extrabold text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome to TuristGo
                </motion.h2>
                <motion.p 
                  className="mt-2 text-center text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Your gateway to unique tourist experiences
                </motion.p>
              </div>

              <motion.div 
                className="bg-white/80 backdrop-blur-sm dark:bg-[var(--color-fountain-blue-800)]/90 p-8 rounded-2xl shadow-xl mt-8 border border-[var(--color-fountain-blue-100)] dark:border-[var(--color-fountain-blue-700)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.01 }}
              >
                <div className="space-y-6">
                    <motion.button
                      onClick={handleLogin}
                      className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)] dark:focus:ring-[var(--color-fountain-blue-400)] transition-all duration-200 hover:shadow-xl"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default GoogleLogin; 