import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { API_ENDPOINTS } from '../config/api';

export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuth, setIsNewLogin, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_ENDPOINTS.AUTH.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el inicio de sesión');
      }

      // Guardar el token
      localStorage.setItem('token', data.token);
      
      // Marcar como nuevo login
      setIsNewLogin(true);
      
      // Actualizar el estado de autenticación
      await checkAuth();

      // Redirigir según el rol del usuario
      if (user?.role === 'tourist') {
        navigate('/tourist-request');
      } else if (user?.role === 'driver') {
        navigate('/driver-registration');
      } else {
        // Si no tiene rol, ir a la página de selección
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el inicio de sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = API_ENDPOINTS.AUTH.GOOGLE;
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
            Iniciar Sesión
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

        {/* Google
        <div>
          <motion.button
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)]"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Continuar con Google</span>
          </motion.button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-[var(--color-fountain-blue-800)] text-gray-500 dark:text-gray-400">
              O
            </span>
          </div>
        </div> Login Button */}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-400)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 focus:outline-none focus:ring-[var(--color-fountain-blue-500)] focus:border-[var(--color-fountain-blue-500)]"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-400)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 focus:outline-none focus:ring-[var(--color-fountain-blue-500)] focus:border-[var(--color-fountain-blue-500)]"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-fountain-blue-600)] hover:bg-[var(--color-fountain-blue-700)] dark:bg-[var(--color-fountain-blue-500)] dark:hover:bg-[var(--color-fountain-blue-600)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)]"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Iniciar Sesión'
              )}
            </motion.button>
          </div>
        </form>

        <div className="text-center space-y-2">
          <button
            onClick={() => navigate('/register')}
            className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)] hover:text-[var(--color-fountain-blue-800)] dark:hover:text-[var(--color-fountain-blue-100)]"
          >
            ¿No tienes una cuenta? Regístrate
          </button>
        </div>
      </motion.div>
    </div>
  );
};

 