import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Main: React.FC = () => {
  const navigate = useNavigate();

  const handleTouristClick = () => {
    navigate('/tourist-request');
  };

  return (
    <div className="min-h-screen flex bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
      <div className="flex-1 flex flex-col">
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
                  className="mt-6 text-center text-4xl font-extrabold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)]"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  ¿Qué deseas hacer?
                </motion.h2>
                <motion.p 
                  className="mt-2 text-center text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Selecciona una opción para continuar
                </motion.p>
              </div>

              <motion.div 
                className="bg-white/80 backdrop-blur-sm dark:bg-[var(--color-fountain-blue-800)]/90 p-8 rounded-2xl shadow-xl mt-8 space-y-6 border border-[var(--color-fountain-blue-100)] dark:border-[var(--color-fountain-blue-700)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={handleTouristClick}
                  className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)] transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Soy Turista
                </motion.button>

                <motion.button
                  className="w-full flex items-center justify-center py-4 px-6 border-2 border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-500)] rounded-xl shadow-sm text-lg font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-300)] bg-white dark:bg-transparent hover:bg-[var(--color-fountain-blue-50)] dark:hover:bg-[var(--color-fountain-blue-700)]/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)] transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Soy Guía Turístico
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Main;
