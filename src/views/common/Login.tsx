import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { API_ENDPOINTS } from '../../config/api';
import { useTranslation } from 'react-i18next';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuth, setIsNewLogin } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t('auth.login.error'));
      }

      console.log('Login successful, received data:', data);
      
      // Guardar el token
      localStorage.setItem('token', data.token);
      console.log('Token saved to localStorage');
      
      // Marcar como nuevo login
      setIsNewLogin(true);
      
      // Actualizar el estado de autenticación y esperar a que termine
      console.log('Checking auth...');
      await checkAuth();
      console.log('Auth check completed');

      // Redirigir según el tipo de usuario
      if (data.userType === 'driver') {
        console.log('User is a driver, redirecting to driver form');
        navigate('/driver-form');
      } else if (data.userType === 'tourist') {
        console.log('User is a tourist, redirecting to tourist request');
        navigate('/tourist-request');
      } else {
        console.log('User type not set, redirecting to selection page');
        navigate('/selection');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.login.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm dark:bg-[var(--color-fountain-blue-800)]/90 rounded-2xl shadow-xl"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)]">
            {t('auth.login.title')}
          </h2>
          {location.state?.message && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-center text-sm text-green-600"
            >
              {location.state.message}
            </motion.p>
          )}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-300)]">
                {t('auth.login.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] placeholder-[var(--color-fountain-blue-500)] dark:placeholder-[var(--color-fountain-blue-400)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] bg-white/50 dark:bg-[var(--color-fountain-blue-700)]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-fountain-blue-500)] focus:border-transparent transition-all duration-200"
                placeholder={t('auth.login.email')}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-300)]">
                {t('auth.login.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] placeholder-[var(--color-fountain-blue-500)] dark:placeholder-[var(--color-fountain-blue-400)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] bg-white/50 dark:bg-[var(--color-fountain-blue-700)]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-fountain-blue-500)] focus:border-transparent transition-all duration-200"
                placeholder={t('auth.login.password')}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[var(--color-fountain-blue-600)] hover:bg-[var(--color-fountain-blue-700)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t('common.loading')}
                </div>
              ) : (
                t('auth.login.submit')
              )}
            </button>
          </div>

          <div className="text-center">
            <a
              href="#"
              className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-400)] hover:text-[var(--color-fountain-blue-700)] dark:hover:text-[var(--color-fountain-blue-300)] transition-colors duration-200"
            >
              {t('auth.login.forgotPassword')}
            </a>
          </div>

          <div className="text-center">
            <span className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-400)]">
              {t('auth.login.noAccount')}{' '}
            </span>
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-300)] hover:text-[var(--color-fountain-blue-800)] dark:hover:text-[var(--color-fountain-blue-200)] transition-colors duration-200"
            >
              {t('auth.login.signUp')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

 