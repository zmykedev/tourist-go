import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Success: React.FC = () => {
  const navigate = useNavigate();

  // Obtener los detalles de la reserva del localStorage
  const requestDetails = JSON.parse(localStorage.getItem('requestDetails') || '{}');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)] flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-white dark:bg-[var(--color-fountain-blue-800)] rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 relative overflow-hidden"
      >
        {/* Animación de partículas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[var(--color-fountain-blue-500)] rounded-full"
              initial={{
                opacity: 0,
                x: Math.random() * 100 - 50 + '%',
                y: '100%',
              }}
              animate={{
                opacity: [0, 1, 0],
                x: Math.random() * 100 - 50 + '%',
                y: '-100%',
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeOut"
                }
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] mb-4"
          >
            ¡Reserva Confirmada!
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)] mb-8"
          >
            Hemos enviado los detalles de tu reserva a tu correo electrónico.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]/50 rounded-xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] mb-4">
              Detalles del Viaje
            </h3>
            <div className="space-y-2 text-left">
              <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                <span className="font-medium">Desde:</span> {requestDetails.pickupLocation}
              </p>
              <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                <span className="font-medium">Hasta:</span> {requestDetails.destination}
              </p>
              <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                <span className="font-medium">Fecha:</span>{' '}
                {requestDetails.date?.startDate
                  ? new Date(requestDetails.date.startDate).toLocaleDateString()
                  : 'No especificada'}
              </p>
              <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                <span className="font-medium">Hora:</span> {requestDetails.time}
              </p>
              <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                <span className="font-medium">Pasajeros:</span> {requestDetails.passengers}
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => navigate('/tourist-request')}
              className="px-6 py-3 bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] text-white rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Nueva Reserva
            </motion.button>
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 border-2 border-[var(--color-fountain-blue-500)] text-[var(--color-fountain-blue-500)] dark:border-[var(--color-fountain-blue-300)] dark:text-[var(--color-fountain-blue-300)] rounded-lg transition-colors duration-200 hover:bg-[var(--color-fountain-blue-50)] dark:hover:bg-[var(--color-fountain-blue-900)]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Volver al Inicio
            </motion.button>
          </div>
    </div>
      </motion.div>
    </motion.div>
  );
};

export default Success;