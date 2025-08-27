import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon, TruckIcon, UserIcon, LanguageIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

interface Driver {
  id: number;
  user_id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  license_number: string;
  vehicle_type: string;
  vehicle_model: string;
  vehicle_color: string;
  languages: string;
  experience: number;
  is_available: boolean;
  status: string;
  created_at: string;
}

const DriverSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const driver = location.state?.driver as Driver;

  if (!driver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white/80 dark:bg-[var(--color-fountain-blue-800)]/80 backdrop-blur-sm rounded-2xl shadow-xl border border-[var(--color-fountain-blue-100)] dark:border-[var(--color-fountain-blue-700)]"
        >
          <h2 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
            {t('driverSuccess.noInfo')}
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/driver-form')}
            className="mt-4 px-6 py-3 bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)] text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t('driverSuccess.backToForm')}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const formattedDate = new Date(driver.created_at).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)] py-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background animated elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[var(--color-fountain-blue-500)]/20 dark:bg-[var(--color-fountain-blue-400)]/20 rounded-full"
            initial={{
              opacity: 0,
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0, 1, 0],
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              transition: {
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 dark:bg-[var(--color-fountain-blue-800)]/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-[var(--color-fountain-blue-100)] dark:border-[var(--color-fountain-blue-700)]"
        >
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-fountain-blue-600)] to-[var(--color-fountain-blue-800)] dark:from-[var(--color-fountain-blue-500)] dark:to-[var(--color-fountain-blue-700)]">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            </div>
            <div className="relative px-8 py-12 text-white">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="flex items-center justify-center mb-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
                  <CheckCircleIcon className="h-20 w-20 relative z-10" />
                </div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-center mb-3"
              >
                {t('driver.success.title')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-[var(--color-fountain-blue-100)] text-lg"
              >
                {t('driver.success.subtitle')}
              </motion.p>
            </div>
          </div>

          {/* Driver Information */}
          <div className="px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6 bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]/50 p-6 rounded-2xl"
              >
                <div className="flex items-center space-x-3">
                  <TruckIcon className="h-6 w-6 text-[var(--color-fountain-blue-500)]" />
                  <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
                    {t('driver.success.vehicleInfo')}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">{t('driver.form.vehicleType')}</p>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driver.vehicle_type}</p>
                  </div>
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">{t('driver.form.vehicleModel')}</p>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driver.vehicle_model}</p>
                  </div>
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">{t('driver.form.vehicleColor')}</p>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driver.vehicle_color}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6 bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]/50 p-6 rounded-2xl"
              >
                <div className="flex items-center space-x-3">
                  <UserIcon className="h-6 w-6 text-[var(--color-fountain-blue-500)]" />
                  <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
                    {t('driver.success.driverDetails')}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">{t('auth.register.name')}</p>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driver.user?.name || t('driverSuccess.notAvailable')}</p>
                  </div>
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">{t('driver.form.licenseNumber')}</p>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driver.license_number}</p>
                  </div>
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">{t('driver.form.languages')}</p>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driver.languages}</p>
                  </div>
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">{t('driver.form.experience')}</p>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driver.experience} {t('driverList.years')}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]/50 p-6 rounded-2xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <ClockIcon className="h-6 w-6 text-[var(--color-fountain-blue-500)]" />
                <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
                  {t('driver.success.additionalInfo')}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                  <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">{t('driver.success.registrationDate')}</p>
                  <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{formattedDate}</p>
                </div>
                <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                  <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">{t('driver.success.status')}</p>
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    driver.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                  }`}>
                    {driver.status === 'active' ? t('driver.success.active') : t('driver.success.pending')}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 bg-[var(--color-fountain-blue-500)] hover:bg-[var(--color-fountain-blue-600)] dark:bg-[var(--color-fountain-blue-400)] dark:hover:bg-[var(--color-fountain-blue-500)] text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('driver.success.goToDashboard')}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/profile')}
                className="px-8 py-4 bg-[var(--color-fountain-blue-100)] hover:bg-[var(--color-fountain-blue-200)] dark:bg-[var(--color-fountain-blue-700)] dark:hover:bg-[var(--color-fountain-blue-600)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)] rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {t('driver.success.viewProfile')}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DriverSuccess; 