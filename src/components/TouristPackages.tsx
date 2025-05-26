import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface TouristPackage {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  included_services: string[];
  max_passengers: number;
  available: boolean;
  rating: number;
}

const TouristPackages: React.FC = () => {
  const [packages, setPackages] = useState<TouristPackage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data
    const mockPackages: TouristPackage[] = [
      {
        id: 1,
        name: "Dunas de Con Con",
        description: "Explora las hermosas dunas costeras de Con Con",
        price: 50,
        duration: "4 horas",
        image: "https://example.com/dunas-con-con.jpg",
        included_services: ["Transporte", "Guía turístico", "Snacks"],
        max_passengers: 10,
        available: true,
        rating: 4.5
      },
      {
        id: 2,
        name: "Campos de Golf",
        description: "Disfruta de una experiencia de golf en campos de clase mundial",
        price: 120,
        duration: "6 horas",
        image: "https://example.com/campos-golf.jpg",
        included_services: ["Equipo de golf", "Instructor", "Almuerzo"],
        max_passengers: 4,
        available: true,
        rating: 4.8
      },
      {
        id: 3,
        name: "Embalse del Yeso",
        description: "Visita el impresionante Embalse del Yeso en los Andes",
        price: 80,
        duration: "Full día",
        image: "https://example.com/embalse-yeso.jpg",
        included_services: ["Transporte", "Guía", "Almuerzo", "Fotografía"],
        max_passengers: 15,
        available: true,
        rating: 4.7
      },
      {
        id: 4,
        name: "Viña del Mar",
        description: "Recorre la hermosa ciudad costera de Viña del Mar",
        price: 60,
        duration: "5 horas",
        image: "https://example.com/vina-del-mar.jpg",
        included_services: ["Tour guiado", "Entradas a atracciones", "Merienda"],
        max_passengers: 20,
        available: true,
        rating: 4.6
      },
      {
        id: 5,
        name: "Casino de Viña del Mar",
        description: "Experimenta la emoción del Casino de Viña del Mar",
        price: 90,
        duration: "Noche completa",
        image: "https://example.com/casino-vina.jpg",
        included_services: ["Entrada VIP", "Cena gourmet", "Transporte"],
        max_passengers: 8,
        available: true,
        rating: 4.4
      }
    ];

    setPackages(mockPackages);
  }, []);

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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Paquetes Turísticos</h1>
          <p className="text-xl text-gray-600">Descubre experiencias únicas en nuestros tours</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col p-6 hover:scale-105 transition-transform duration-300 border-2 border-purple-100 hover:border-purple-400"
            >
              <div className="relative h-48 mb-6">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="text-purple-600 font-semibold">${pkg.price}</span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h2>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-purple-700 font-semibold">{pkg.rating.toFixed(1)}</span>
              </div>

              <p className="text-gray-600 mb-4">{pkg.description}</p>

              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-4">
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duración</span>
                    <span className="font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Máx. Pasajeros</span>
                    <span className="font-medium">{pkg.max_passengers}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-gray-700 font-semibold mb-2">Servicios Incluidos:</h3>
                <div className="flex flex-wrap gap-2">
                  {pkg.included_services.map((service, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-colors font-semibold shadow-lg"
                onClick={() => navigate(`/book-package/${pkg.id}`)}
                disabled={!pkg.available}
              >
                {pkg.available ? 'Reservar Ahora' : 'No Disponible'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay paquetes turísticos disponibles en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristPackages;
