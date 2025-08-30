import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import { PlusIcon, MinusIcon, CheckIcon } from '@heroicons/react/24/outline';

interface DriverFormData {
  license_number: string;
  vehicle_type: string;
  vehicle_model: string;
  vehicle_color: string;
  languages: string[];
  experience: number;
}

const inputBaseClasses = "mt-1 block w-full px-4 py-3 rounded-xl border bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 border-[var(--color-fountain-blue-200)] dark:border-[var(--color-fountain-blue-600)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-500)] shadow-sm transition-all duration-200 focus:border-[var(--color-fountain-blue-500)] focus:ring focus:ring-[var(--color-fountain-blue-500)]/20 focus:outline-none";

const steps = [
  { id: 1, label: "Información Personal", icon: "👤" },
  { id: 2, label: "Vehículo", icon: "🚗" },
  { id: 3, label: "Experiencia", icon: "⭐" },
  { id: 4, label: "Confirmación", icon: "✅" },
];

const DriverForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      await handleSubmit();
      return;
    }

    setLoading(true);
    // Simulate validation or API call
    await new Promise((res) => setTimeout(res, 800));
    setLoading(false);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
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
      setTimeout(() => {
        navigate('/driver-success', { state: { driver: data } });
      }, 2000);
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

  const handleExperienceChange = (increment: boolean) => {
    setFormData(prev => ({
      ...prev,
      experience: increment 
        ? Math.min(prev.experience + 1, 50)
        : Math.max(prev.experience - 1, 0)
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return formData.license_number.trim() !== '';
      case 1: // Vehicle
        return formData.vehicle_type !== '' && formData.vehicle_model.trim() !== '' && formData.vehicle_color.trim() !== '';
      case 2: // Experience
        return formData.languages.length > 0;
      case 3: // Confirmation
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm dark:bg-[var(--color-fountain-blue-800)]/90 rounded-2xl shadow-xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] mb-2">
            Registro de Chofer
          </h2>
          <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
            Completa los siguientes pasos para unirte a nuestro equipo
          </p>
        </div>

        {/* Stepper */}
        <div className="flex justify-between mb-8">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex-1 text-center relative">
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className={`absolute top-5 left-1/2 w-full h-0.5 transform -translate-y-1/2 ${
                  idx < currentStep ? 'bg-[var(--color-fountain-blue-500)]' : 'bg-gray-200'
                }`} />
              )}
              
              <div className="relative z-10">
                <div
                  className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                    idx < currentStep 
                      ? 'bg-[var(--color-fountain-blue-600)] text-white scale-110' 
                      : idx === currentStep 
                        ? 'bg-[var(--color-fountain-blue-500)] text-white ring-4 ring-[var(--color-fountain-blue-200)]' 
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {idx < currentStep ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span className="text-lg">{step.icon}</span>
                  )}
                </div>
                <p
                  className={`mt-2 text-sm font-medium transition-colors duration-300 ${
                    idx <= currentStep 
                      ? 'text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)]' 
                      : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Error/Success Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl border border-red-200"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl border border-green-200"
            >
              ¡Registro exitoso! Redirigiendo a la página de confirmación...
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content with Animation */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: -20, y: -10 }}
              transition={{ 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for natural feel
                opacity: { duration: 0.4 },
                x: { duration: 0.5 },
                y: { duration: 0.5 }
              }}
              className="absolute w-full"
            >
              {currentStep === 0 && <StepPersonalInfo formData={formData} handleChange={handleChange} />}
              {currentStep === 1 && <StepVehicle formData={formData} setFormData={setFormData} handleChange={handleChange} />}
              {currentStep === 2 && <StepExperience formData={formData} setFormData={setFormData} handleExperienceChange={handleExperienceChange} />}
              {currentStep === 3 && <StepConfirmation formData={formData} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBack}
            disabled={currentStep === 0 || loading || isSubmitting}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-400"
          >
            Atrás
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            disabled={!isStepValid() || loading || isSubmitting}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              isStepValid() && !loading && !isSubmitting
                ? 'bg-[var(--color-fountain-blue-600)] text-white hover:bg-[var(--color-fountain-blue-700)]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Procesando...
              </div>
            ) : currentStep === steps.length - 1 ? (
              isSubmitting ? 'Guardando...' : 'Completar Registro'
            ) : (
              'Siguiente'
            )}
          </motion.button>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[var(--color-fountain-blue-700)]">Validando información...</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Step Components
function StepPersonalInfo({ formData, handleChange }: { formData: DriverFormData; handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] mb-2">
          Información Personal
        </h3>
        <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
          Comencemos con tus datos básicos
        </p>
      </div>
      
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
    </div>
  );
}

function StepVehicle({ formData, setFormData, handleChange }: { 
  formData: DriverFormData; 
  setFormData: React.Dispatch<React.SetStateAction<DriverFormData>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] mb-2">
          Información del Vehículo
        </h3>
        <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
          Cuéntanos sobre tu vehículo
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
          Tipo de Vehículo
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'sedan', label: 'Sedán', icon: '🚗' },
            { value: 'suv', label: 'SUV', icon: '🚙' },
            { value: 'van', label: 'Van', icon: '🚐' },
            { value: 'luxury', label: 'Lujo', icon: '🏎️' }
          ].map((type) => (
            <motion.button
              key={type.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, vehicle_type: type.value }))}
              className={`p-4 rounded-xl transition-all duration-200 font-semibold text-base focus:outline-none focus:ring-2 focus:ring-[var(--color-fountain-blue-500)]/40 ${
                formData.vehicle_type === type.value
                  ? 'bg-[var(--color-fountain-blue-600)] text-white shadow-md scale-105'
                  : 'bg-white/80 dark:bg-[var(--color-fountain-blue-800)]/80 text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] hover:bg-[var(--color-fountain-blue-50)] dark:hover:bg-[var(--color-fountain-blue-700)]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              {type.label}
            </motion.button>
          ))}
        </div>
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
    </div>
  );
}

function StepExperience({ formData, setFormData, handleExperienceChange }: {
  formData: DriverFormData;
  setFormData: React.Dispatch<React.SetStateAction<DriverFormData>>;
  handleExperienceChange: (increment: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] mb-2">
          Experiencia e Idiomas
        </h3>
        <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
          Tu experiencia y habilidades lingüísticas
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
          Idiomas que hablas
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'es', label: 'Español', flag: '🇪🇸' },
            { value: 'en', label: 'Inglés', flag: '🇺🇸' },
            { value: 'fr', label: 'Francés', flag: '🇫🇷' },
            { value: 'de', label: 'Alemán', flag: '🇩🇪' },
            { value: 'it', label: 'Italiano', flag: '🇮🇹' },
            { value: 'pt', label: 'Portugués', flag: '🇵🇹' }
          ].map((lang) => (
            <motion.button
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
              className={`p-3 rounded-xl transition-all duration-200 flex items-center space-x-2 ${
                formData.languages.includes(lang.value)
                  ? 'bg-[var(--color-fountain-blue-600)] text-white shadow-md scale-105'
                  : 'bg-white/80 dark:bg-[var(--color-fountain-blue-800)]/80 text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] hover:bg-[var(--color-fountain-blue-50)] dark:hover:bg-[var(--color-fountain-blue-700)]'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </motion.button>
          ))}
        </div>
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
  );
}

function StepConfirmation({ formData }: { formData: DriverFormData }) {
  const vehicleTypes = {
    sedan: 'Sedán',
    suv: 'SUV',
    van: 'Van',
    luxury: 'Lujo'
  };

  const languageNames = {
    es: 'Español',
    en: 'Inglés',
    fr: 'Francés',
    de: 'Alemán',
    it: 'Italiano',
    pt: 'Portugués'
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] mb-2">
          Confirmar Información
        </h3>
        <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
          Revisa tus datos antes de completar el registro
        </p>
      </div>

      <div className="bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-800)]/50 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
              Información Personal
            </h4>
            <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
              <strong>Licencia:</strong> {formData.license_number}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
              Vehículo
            </h4>
            <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
              <strong>Tipo:</strong> {vehicleTypes[formData.vehicle_type as keyof typeof vehicleTypes]}<br />
              <strong>Modelo:</strong> {formData.vehicle_model}<br />
              <strong>Color:</strong> {formData.vehicle_color}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
              Experiencia
            </h4>
            <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
              <strong>Años:</strong> {formData.experience} años
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] mb-2">
              Idiomas
            </h4>
            <p className="text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
              {formData.languages.map(lang => languageNames[lang as keyof typeof languageNames]).join(', ')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl p-4">
        <div className="flex items-center">
          <CheckIcon className="w-5 h-5 text-green-600 mr-2" />
          <p className="text-green-700 dark:text-green-300 text-sm">
            Todos los datos han sido verificados. Estás listo para completar tu registro.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DriverForm;