import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import { useAuth } from '../contexts/AuthContext';

const Selection: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateRole } = useAuth();

  useEffect(() => {
    // Si el usuario ya tiene un rol, redirigir a la página correspondiente
    if (user?.role === 'tourist') {
      navigate('/tourist-request');
    } else if (user?.role === 'driver') {
      navigate('/driver-registration');
    }
  }, [user, navigate]);

  // Si el usuario no tiene rol, mostrar la página de selección
  const handleRoleSelection = async (role: 'tourist' | 'driver') => {
    try {
      // 1. Actualizar el rol del usuario usando el contexto
      await updateRole(role);

      // 2. Si el rol es turista, crear el perfil de turista
      if (role === 'tourist') {
        const createTouristResponse = await fetch(API_ENDPOINTS.API.TOURISTS.BASE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            nationality: 'Not specified',
            language: 'Not specified',
            arrival_date: new Date(),
            departure_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días después
            preferences: '',
            special_needs: '',
            status: 'pending'
          }),
        });

        if (!createTouristResponse.ok) {
          throw new Error('Error al crear el perfil de turista');
        }
      }

      // 3. Redirigir según el rol seleccionado
      if (role === 'tourist') {
        navigate('/tourist-request');
      } else {
        navigate('/driver-registration');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Si el usuario ya tiene un rol, no renderizar nada mientras se realiza la redirección
  if (user?.role) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] mb-4"
          >
            ¡Bienvenido a Chile!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-300)] mb-8"
          >
            ¿Cómo te gustaría participar en nuestra plataforma?
          </motion.p>

          <motion.div 
            className="bg-white/80 backdrop-blur-sm dark:bg-[var(--color-fountain-blue-800)]/90 p-8 rounded-2xl shadow-xl mt-8 space-y-6 border border-[var(--color-fountain-blue-100)] dark:border-[var(--color-fountain-blue-700)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => handleRoleSelection('tourist')}
              className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)] transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Soy Turista
            </motion.button>

            <motion.button
              onClick={() => handleRoleSelection('driver')}
              className="w-full flex items-center justify-center py-4 px-6 border-2 border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-500)] rounded-xl shadow-sm text-lg font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-300)] bg-white dark:bg-transparent hover:bg-[var(--color-fountain-blue-50)] dark:hover:bg-[var(--color-fountain-blue-700)]/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)] transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Soy Guía Turístico
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Selection; 