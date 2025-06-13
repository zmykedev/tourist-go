import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface DriverFormData {
  license_number: string;
  vehicle_type: string;
  vehicle_model: string;
  vehicle_color: string;
  languages: string[];
  experience: number;
}

const inputBaseClasses = "mt-1 block w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 border-[var(--color-fountain-blue-200)] dark:border-[var(--color-fountain-blue-600)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-500)] shadow-sm transition-all duration-200 focus:border-[var(--color-fountain-blue-500)] focus:ring focus:ring-[var(--color-fountain-blue-500)]/20 focus:outline-none";

const DriverForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<DriverFormData>({
    license_number: '',
    vehicle_type: '',
    vehicle_model: '',
    vehicle_color: '',
    languages: ['es'],
    experience: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.API.DRIVERS.BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          experience: Number(formData.experience),
          languages: formData.languages.join(','),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los datos del chofer');
      }

      const data = await response.json();
      setSuccess(true);
      
      // Navigate to success page with driver data
      navigate('/driver-success', { state: { driver: data } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedLanguages: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedLanguages.push(options[i].value);
      }
    }
    setFormData(prev => ({
      ...prev,
      languages: selectedLanguages
    }));
  };

  const handleExperienceChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      experience: increment 
        ? Math.min(prev.experience + 1, 50)
        : Math.max(prev.experience - 1, 0)
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm dark:bg-[var(--color-fountain-blue-800)]/90 rounded-2xl shadow-xl"
      >
        <div className="md:flex">
          <div className="md:w-1/2 bg-cover bg-center p-8" style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80")'
          }}>
            <motion.div 
              className="h-full flex flex-col justify-center"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">Únete a Nuestro Equipo</h2>
              <p className="text-white text-lg">Conviértete en un chofer profesional y forma parte de nuestra comunidad</p>
            </motion.div>
          </div>

          <div className="md:w-1/2 p-8">
            <motion.div
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] mb-6">Registro de Chofer</h3>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl"
                >
                  ¡Registro exitoso! Redirigiendo a la lista de choferes...
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
                      Número de Licencia
                    </label>
                    <input
                      type="text"
                      name="license_number"
                      value={formData.license_number}
                      onChange={handleChange}
                      required
                      className={inputBaseClasses}
                      placeholder="Ingrese su número de licencia"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
                      Tipo de Vehículo
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[
                        { value: 'sedan', label: 'Sedán' },
                        { value: 'suv', label: 'SUV' },
                        { value: 'van', label: 'Van' },
                        { value: 'luxury', label: 'Lujo' }
                      ].map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, vehicle_type: type.value }))}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-fountain-blue-500)]/40
                            ${formData.vehicle_type === type.value
                              ? 'bg-[var(--color-fountain-blue-600)] text-white shadow-md scale-105'
                              : 'bg-white/80 dark:bg-[var(--color-fountain-blue-800)]/80 text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] hover:bg-[var(--color-fountain-blue-50)] dark:hover:bg-[var(--color-fountain-blue-700)]'}
                          `}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                    {formData.vehicle_type === '' && (
                      <p className="mt-2 text-sm text-red-500">
                        Por favor seleccione un tipo de vehículo
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
                        Modelo
                      </label>
                      <input
                        type="text"
                        name="vehicle_model"
                        value={formData.vehicle_model}
                        onChange={handleChange}
                        required
                        className={inputBaseClasses}
                        placeholder="Ej: Toyota Corolla"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
                        Color
                      </label>
                      <input
                        type="text"
                        name="vehicle_color"
                        value={formData.vehicle_color}
                        onChange={handleChange}
                        required
                        className={inputBaseClasses}
                        placeholder="Ej: Negro"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]">
                      Idiomas
                    </label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[
                        { value: 'es', label: 'Español' },
                        { value: 'en', label: 'Inglés' },
                        { value: 'fr', label: 'Francés' },
                        { value: 'de', label: 'Alemán' },
                        { value: 'it', label: 'Italiano' }
                      ].map((lang) => (
                        <button
                          key={lang.value}
                          type="button"
                          onClick={() => {
                            const newLanguages = formData.languages.includes(lang.value)
                              ? formData.languages.filter(l => l !== lang.value)
                              : [...formData.languages, lang.value];
                            setFormData(prev => ({
                              ...prev,
                              languages: newLanguages
                            }));
                          }}
                          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                            formData.languages.includes(lang.value)
                              ? 'bg-[var(--color-fountain-blue-600)] text-white shadow-md scale-105'
                              : 'bg-white/80 dark:bg-[var(--color-fountain-blue-800)]/80 text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] hover:bg-[var(--color-fountain-blue-50)] dark:hover:bg-[var(--color-fountain-blue-700)]'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                    {formData.languages.length === 0 && (
                      <p className="mt-2 text-sm text-red-500">
                        Por favor seleccione al menos un idioma
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
                      Años de Experiencia
                    </label>
                    <div className="relative flex items-center">
                      <motion.button
                        type="button"
                        onClick={() => handleExperienceChange(false)}
                        disabled={formData.experience <= 0}
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg 
                          ${formData.experience <= 0 
                            ? 'text-[var(--color-fountain-blue-300)] dark:text-[var(--color-fountain-blue-600)]' 
                            : 'text-[var(--color-fountain-blue-500)] dark:text-[var(--color-fountain-blue-400)] hover:bg-[var(--color-fountain-blue-100)] dark:hover:bg-[var(--color-fountain-blue-700)]'
                          } transition-colors duration-200`}
                        whileHover={formData.experience > 0 ? { scale: 1.1 } : {}}
                        whileTap={formData.experience > 0 ? { scale: 0.95 } : {}}
                      >
                        <MinusIcon className="w-5 h-5" />
                      </motion.button>
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        min="0"
                        max="50"
                        required
                        className={`${inputBaseClasses} pl-16 pr-16 text-center`}
                        readOnly
                      />
                      <motion.button
                        type="button"
                        onClick={() => handleExperienceChange(true)}
                        disabled={formData.experience >= 50}
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg 
                          ${formData.experience >= 50 
                            ? 'text-[var(--color-fountain-blue-300)] dark:text-[var(--color-fountain-blue-600)]' 
                            : 'text-[var(--color-fountain-blue-500)] dark:text-[var(--color-fountain-blue-400)] hover:bg-[var(--color-fountain-blue-100)] dark:hover:bg-[var(--color-fountain-blue-700)]'
                          } transition-colors duration-200`}
                        whileHover={formData.experience < 50 ? { scale: 1.1 } : {}}
                        whileTap={formData.experience < 50 ? { scale: 0.95 } : {}}
                      >
                        <PlusIcon className="w-5 h-5" />
                      </motion.button>
                    </div>
                    <p className="mt-1 text-xs text-[var(--color-fountain-blue-500)] dark:text-[var(--color-fountain-blue-400)]">
                      Máximo 50 años de experiencia
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-colors ${
                    isSubmitting
                      ? 'bg-[var(--color-fountain-blue-400)] cursor-not-allowed'
                      : 'bg-[var(--color-fountain-blue-600)] hover:bg-[var(--color-fountain-blue-700)] dark:bg-[var(--color-fountain-blue-500)] dark:hover:bg-[var(--color-fountain-blue-600)]'
                  }`}
                >
                  {isSubmitting ? 'Guardando...' : 'Completar Registro'}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DriverForm;