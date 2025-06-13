import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  UserIcon, 
  EnvelopeIcon, 
  TruckIcon, 
  LanguageIcon, 
  ClockIcon, 
  StarIcon,
  PencilIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface Driver {
  id: number;
  user_id: number;
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

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [driverData, setDriverData] = useState<Driver | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDriverData = async () => {
      if (user?.role === 'driver') {
        try {
          const response = await fetch('/api/drivers/profile', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setDriverData(data);
          }
        } catch (error) {
          console.error('Error fetching driver data:', error);
        }
      }
      setIsLoading(false);
    };

    fetchDriverData();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white/80 dark:bg-[var(--color-fountain-blue-800)]/80 backdrop-blur-sm rounded-2xl shadow-xl"
        >
          <p className="text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
            Please log in to view your profile.
          </p>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)] py-12 px-4 sm:px-6 lg:px-8">
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

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 dark:bg-[var(--color-fountain-blue-800)]/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-[var(--color-fountain-blue-100)] dark:border-[var(--color-fountain-blue-700)]"
        >
          {/* Profile Header */}
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
                  <div className="w-24 h-24 bg-[var(--color-fountain-blue-400)] rounded-full flex items-center justify-center relative z-10">
                    <UserIcon className="w-12 h-12 text-white" />
                  </div>
                </div>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-center mb-2"
              >
                {user.name}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center text-[var(--color-fountain-blue-100)]"
              >
                {user.role === 'tourist' ? 'Turista' : 'Conductor'}
              </motion.p>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6 bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]/50 p-6 rounded-2xl"
              >
                <div className="flex items-center space-x-3">
                  <UserIcon className="h-6 w-6 text-[var(--color-fountain-blue-500)]" />
                  <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
                    Información Personal
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">Nombre</p>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{user.name}</p>
                  </div>
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">Email</p>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{user.email}</p>
                  </div>
                </div>
              </motion.div>

              {/* Driver Specific Information */}
              {user.role === 'driver' && driverData && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6 bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]/50 p-6 rounded-2xl"
                >
                  <div className="flex items-center space-x-3">
                    <TruckIcon className="h-6 w-6 text-[var(--color-fountain-blue-500)]" />
                    <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">
                      Información del Vehículo
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                      <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">Tipo de Vehículo</p>
                      <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driverData.vehicle_type}</p>
                    </div>
                    <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                      <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">Modelo</p>
                      <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driverData.vehicle_model}</p>
                    </div>
                    <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                      <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">Color</p>
                      <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driverData.vehicle_color}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Additional Information */}
            {user.role === 'driver' && driverData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]/50 p-6 rounded-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <LanguageIcon className="h-5 w-5 text-[var(--color-fountain-blue-500)]" />
                      <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">Idiomas</p>
                    </div>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driverData.languages}</p>
                  </div>
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <ClockIcon className="h-5 w-5 text-[var(--color-fountain-blue-500)]" />
                      <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">Experiencia</p>
                    </div>
                    <p className="text-lg font-medium text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-50)]">{driverData.experience} años</p>
                  </div>
                  <div className="bg-white dark:bg-[var(--color-fountain-blue-800)] p-4 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <StarIcon className="h-5 w-5 text-[var(--color-fountain-blue-500)]" />
                      <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">Estado</p>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      driverData.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    }`}>
                      {driverData.status === 'active' ? 'Activo' : 'Pendiente'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

          
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

