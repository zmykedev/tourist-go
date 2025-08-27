import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, CalendarIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface Booking {
  id: string;
  tourist_id: string;
  driver_id: string;
  driver: {
    name: string;
    vehicle_type: string;
    vehicle_model: string;
    vehicle_color: string;
    languages: string;
    experience: number;
    rating: number;
  };
  status: string;
  booked_at: string;
  pickup_location?: string;
  dropoff_location?: string;
  date_time?: string;
}

const TouristSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const booking = location.state?.booking as Booking;

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
            {t('touristSuccess.noBookingInfo')}
          </h2>
          <button
            onClick={() => navigate('/drivers')}
            className="mt-4 px-4 py-2 bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)] text-white rounded-xl transition-colors"
          >
            {t('touristSuccess.returnToDrivers')}
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(booking.booked_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)] py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--color-fountain-blue-600)] to-[var(--color-fountain-blue-800)] dark:from-[var(--color-fountain-blue-500)] dark:to-[var(--color-fountain-blue-700)] px-6 py-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <CheckCircleIcon className="h-16 w-16" />
            </div>
            <h2 className="text-3xl font-bold text-center">{t('touristSuccess.bookingConfirmed')}</h2>
            <p className="text-center mt-2 text-[var(--color-fountain-blue-100)]">
              {t('touristSuccess.driverAssigned')}
            </p>
          </div>

          {/* Booking Information */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)] flex items-center">
                    <UserIcon className="h-6 w-6 mr-2" />
                    {t('touristSuccess.driverInfo')}
                  </h3>
                  <div className="mt-4 space-y-3">
                    <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-200)]">
                      <span className="font-medium">{t('touristSuccess.name')}:</span> {booking.driver.name}
                    </p>
                    <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-200)]">
                      <span className="font-medium">{t('touristSuccess.vehicle')}:</span> {booking.driver.vehicle_type} - {booking.driver.vehicle_model}
                    </p>
                    <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-200)]">
                      <span className="font-medium">{t('touristSuccess.color')}:</span> {booking.driver.vehicle_color}
                    </p>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-200)]">
                        {booking.driver.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)] flex items-center">
                    <CalendarIcon className="h-6 w-6 mr-2" />
                    {t('touristSuccess.bookingDetails')}
                  </h3>
                  <div className="mt-4 space-y-3">
                    <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-200)]">
                      <span className="font-medium">{t('touristSuccess.bookingDate')}:</span> {formattedDate}
                    </p>
                    <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-200)]">
                      <span className="font-medium">{t('touristSuccess.status')}:</span>
                      <span className={`ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                      }`}>
                        {booking.status === 'confirmed' ? t('touristSuccess.confirmed') : t('touristSuccess.pending')}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)] flex items-center">
                    <MapPinIcon className="h-6 w-6 mr-2" />
                    {t('touristSuccess.tripDetails')}
                  </h3>
                  <div className="mt-4 space-y-3">
                    {booking.pickup_location && (
                      <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-200)]">
                        <span className="font-medium">{t('touristSuccess.pickupPoint')}:</span> {booking.pickup_location}
                      </p>
                    )}
                    {booking.dropoff_location && (
                      <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-200)]">
                        <span className="font-medium">{t('touristSuccess.destination')}:</span> {booking.dropoff_location}
                      </p>
                    )}
                    {booking.date_time && (
                      <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-200)]">
                        <span className="font-medium">{t('touristSuccess.dateAndTime')}:</span> {new Date(booking.date_time).toLocaleString('en-US')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)] text-white rounded-xl transition-colors"
              >
                {t('touristSuccess.goToDashboard')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/bookings')}
                className="px-6 py-3 bg-[var(--color-fountain-blue-100)] hover:bg-[var(--color-fountain-blue-200)] dark:bg-[var(--color-fountain-blue-700)] dark:hover:bg-[var(--color-fountain-blue-600)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)] rounded-xl transition-colors"
              >
                {t('touristSuccess.viewMyBookings')}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TouristSuccess; 