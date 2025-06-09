import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

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

const DriverSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const driver = location.state?.driver as Driver;

  if (!driver) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">No hay información disponible</h2>
          <button
            onClick={() => navigate('/driver-form')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver al formulario
          </button>
        </div>
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <CheckCircleIcon className="h-16 w-16" />
            </div>
            <h2 className="text-3xl font-bold text-center">¡Registro Exitoso!</h2>
            <p className="text-center mt-2 text-blue-100">
              Tu perfil de conductor ha sido creado correctamente
            </p>
          </div>

          {/* Driver Information */}
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Información del Vehículo</h3>
                <div>
                  <p className="text-sm text-gray-500">Tipo de Vehículo</p>
                  <p className="text-lg font-medium text-gray-900">{driver.vehicle_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Modelo</p>
                  <p className="text-lg font-medium text-gray-900">{driver.vehicle_model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Color</p>
                  <p className="text-lg font-medium text-gray-900">{driver.vehicle_color}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Detalles del Conductor</h3>
                <div>
                  <p className="text-sm text-gray-500">Número de Licencia</p>
                  <p className="text-lg font-medium text-gray-900">{driver.license_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Idiomas</p>
                  <p className="text-lg font-medium text-gray-900">{driver.languages}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experiencia</p>
                  <p className="text-lg font-medium text-gray-900">{driver.experience} años</p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div>
                <p className="text-sm text-gray-500">Fecha de Registro</p>
                <p className="text-lg font-medium text-gray-900">{formattedDate}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Estado</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  driver.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {driver.status === 'active' ? 'Activo' : 'Pendiente'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Ir al Dashboard
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/profile')}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Ver Perfil
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DriverSuccess; 