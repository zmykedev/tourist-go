import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface Driver {
  id: number;
  user: {
    name: string;
    email: string;
    photo: string;
  };
  license_number: string;
  vehicle_type: string;
  vehicle_model: string;
  vehicle_color: string;
  languages: string;
  experience: number;
  rating: number;
  isAvailable: boolean;
}


const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllDrivers = async () => {
      setIsLoading(true);
      try {
        // Fetch real drivers
        const realRes = await fetch('http://localhost:3001/api/drivers/available');
        const realDrivers = realRes.ok ? await realRes.json() : [];


        // Combina ambos
        setDrivers([...realDrivers]);
      } catch (err) {
        setError('Error al obtener la lista de choferes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllDrivers();
  }, []);

  const getVehicleTypeLabel = (type: string) => {
    const types: { [key: string]: string } = {
      sedan: 'Sedán',
      suv: 'SUV',
      van: 'Van',
      luxury: 'Lujo'
    };
    return types[type] || type;
  };

  const getLanguageLabel = (lang: string) => {
    const languages: { [key: string]: string } = {
      es: 'Español',
      en: 'Inglés',
      fr: 'Francés',
      de: 'Alemán',
      it: 'Italiano'
    };
    return languages[lang] || lang;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Choferes Disponibles</h1>
          <p className="text-xl text-gray-600">Elige el chofer ideal para tu experiencia turística</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {drivers.map((driver, index) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center p-8 hover:scale-105 transition-transform duration-300 border-2 border-purple-100 hover:border-purple-400"
            >
              <div className="flex flex-col items-center w-full">
                <img
                  src={driver.user.photo}
                  alt={driver.user.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-purple-400 shadow-lg mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{driver.user.name}</h2>
                <p className="text-gray-500 mb-2">{driver.user.email}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-purple-700 font-semibold">{driver.rating.toFixed(1)}</span>
                </div>
                <div className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo</span>
                        <span className="font-medium">{getVehicleTypeLabel(driver.vehicle_type)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Modelo</span>
                      <span className="font-medium">{driver.vehicle_model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color</span>
                      <span className="font-medium">{driver.vehicle_color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Licencia</span>
                      <span className="font-medium">{driver.license_number}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Experiencia</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      {driver.experience} años
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-600 mb-1">Idiomas</span>
                    <div className="flex flex-wrap gap-2">
                      {driver.languages.split(',').map((lang, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                        >
                          {getLanguageLabel(lang)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-auto w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-colors font-semibold shadow-lg"
                  onClick={() => navigate(`/tourist-packages/${driver.id}`)}
                >
                  Seleccionar Chofer
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {drivers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay choferes disponibles en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverList; 