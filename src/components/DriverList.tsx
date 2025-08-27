import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

interface Driver {
  id: number;
  user: {
    name: string;
  };
  languages: string;
  experience: number;
  vehicle_type: string;
  vehicle_model: string;
  vehicle_color: string;
  rating: number;
  is_available: boolean;
}

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.API.DRIVERS.AVAILABLE, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al cargar los conductores');
      }

      const data = await response.json();
      setDrivers(data);
    } catch (err) {
      setError('Error al cargar la lista de conductores');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDriverSelect = (driverId: number) => {
    setSelectedDriver(driverId);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDriver) return;
    setIsSubmitting(true);

    try {
      // Get request details from localStorage
      const requestDetails = JSON.parse(localStorage.getItem('requestDetails') || '{}');

      const response = await fetch(API_ENDPOINTS.API.TOURISTS.BOOK_DRIVER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          driverId: selectedDriver,
          pickup_location: requestDetails.pickupLocation,
          dropoff_location: requestDetails.destination,
          date_time: requestDetails.date.startDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al confirmar la reserva');
      }

      const data = await response.json();
      navigate('/tourist-success', { state: { booking: data } });
    } catch (err) {
      setError('Error al confirmar la reserva');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]"
          >
            Conductores Disponibles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-200)]"
          >
            Seleccione un conductor para su viaje
          </motion.p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-100 text-red-700 rounded-xl text-center"
          >
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {drivers.map((driver) => (
              <motion.div
                key={driver.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className={`bg-white dark:bg-[var(--color-fountain-blue-800)] rounded-xl shadow-lg p-6 cursor-pointer border-2 transition-all duration-200 ${
                  selectedDriver === driver.id
                    ? 'border-[var(--color-fountain-blue-500)] shadow-[var(--color-fountain-blue-200)]'
                    : 'border-transparent hover:border-[var(--color-fountain-blue-300)]'
                }`}
                onClick={() => handleDriverSelect(driver.id)}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[var(--color-fountain-blue-200)] dark:bg-[var(--color-fountain-blue-700)] rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                      {driver.user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)]">
                      {driver.user.name}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                        {driver.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                    <span className="font-medium">Vehículo:</span> {driver.vehicle_type} - {driver.vehicle_model} ({driver.vehicle_color})
                  </p>
                  <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                    <span className="font-medium">Experiencia:</span> {driver.experience} años
                  </p>
                  <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
                    <span className="font-medium">Idiomas:</span> {driver.languages}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 flex justify-center"
        >
          <motion.button
            onClick={handleConfirmBooking}
            disabled={!selectedDriver || isSubmitting}
            className={`px-8 py-3 rounded-xl text-white font-medium transition-all duration-200 ${
              selectedDriver && !isSubmitting
                ? 'bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)]'
                : 'bg-[var(--color-fountain-blue-300)] cursor-not-allowed'
            }`}
            whileHover={selectedDriver && !isSubmitting ? { scale: 1.02 } : {}}
            whileTap={selectedDriver && !isSubmitting ? { scale: 0.98 } : {}}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Procesando...
              </div>
            ) : (
              'Confirmar Selección'
            )}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default DriverList; 