import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS } from '../../config/api';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';

// Password requirement type
interface PasswordRequirement {
  regex: RegExp;
  text: string;
  met: boolean;
}

const registerSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  email: z.string()
    .email('Correo electrónico inválido')
    .min(5, 'El correo electrónico es demasiado corto')
    .max(50, 'El correo electrónico es demasiado largo'),
  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(50, 'La contraseña no puede tener más de 50 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
      'La contraseña debe contener al menos una letra mayúscula, una minúscula, un número y un carácter especial')
});

// Password requirements array
const passwordRequirements: PasswordRequirement[] = [
  { regex: /.{8,}/, text: "Mínimo 8 caracteres", met: false },
  { regex: /[A-Z]/, text: "Una letra mayúscula", met: false },
  { regex: /[a-z]/, text: "Una letra minúscula", met: false },
  { regex: /[0-9]/, text: "Un número", met: false },
  { regex: /[@$!%*?&]/, text: "Un carácter especial", met: false }
];

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    name: ''
  });
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requirements, setRequirements] = useState(passwordRequirements);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Check password requirements
  useEffect(() => {
    const newRequirements = requirements.map(req => ({
      ...req,
      met: req.regex.test(formData.password)
    }));
    
    setRequirements(newRequirements);
    
    // Calculate password strength (0-100)
    const metCount = newRequirements.filter(req => req.met).length;
    setPasswordStrength((metCount / newRequirements.length) * 100);
  }, [formData.password]);

  const validateField = (name: keyof RegisterFormData, value: string) => {
    try {
      registerSchema.shape[name].parse(value);
      setValidationErrors(prev => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      registerSchema.parse(formData);
      setIsLoading(true);

      const response = await fetch(`${API_ENDPOINTS.AUTH.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ?? t('auth.register.error'));
      }

      const data = await response.json();
      
      // Store the token if provided
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      navigate('/login', { state: { message: t('auth.register.successMessage') } });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors = err.errors.reduce((acc, curr) => {
          const field = curr.path[0] as keyof RegisterFormData;
          acc[field] = curr.message;
          return acc;
        }, {} as Partial<Record<keyof RegisterFormData, string>>);
        setValidationErrors(errors);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t('auth.register.error'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof RegisterFormData, value);
  };

  const getPasswordStrengthColor = (strength: number): string => {
    if (strength < 40) return '#ef4444';
    if (strength < 70) return '#eab308';
    return '#22c55e';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)] px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-white/80 dark:bg-[var(--color-fountain-blue-800)]/80 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-xl"
      >
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)]">
            {t('auth.register.title')}
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-300)] mb-1">
                {t('auth.register.name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-400)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 focus:outline-none focus:ring-[var(--color-fountain-blue-500)] focus:border-[var(--color-fountain-blue-500)] text-base sm:text-sm"
                placeholder={t('auth.register.name')}
                value={formData.name}
                onChange={handleChange}
              />
              
              <AnimatePresence>
                {formData.name && !validationErrors.name && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-500 dark:text-green-400"
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-300)] mb-1">
                {t('auth.register.email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-400)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 focus:outline-none focus:ring-[var(--color-fountain-blue-500)] focus:border-[var(--color-fountain-blue-500)] text-base sm:text-sm"
                placeholder={t('auth.register.email')}
                value={formData.email}
                onChange={handleChange}
              />
              
              <AnimatePresence>
                {formData.email && !validationErrors.email && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-500 dark:text-green-400"
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-300)] mb-1">
                {t('auth.register.password')}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-400)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 focus:outline-none focus:ring-[var(--color-fountain-blue-500)] focus:border-[var(--color-fountain-blue-500)] text-base sm:text-sm"
                placeholder={t('auth.register.password')}
                value={formData.password}
                onChange={handleChange}
              />
              
              <AnimatePresence>
                {formData.password && !validationErrors.password && passwordStrength === 100 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-500 dark:text-green-400"
                    >
                      ✓
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Password strength indicator and requirements - only show when password is not yet valid */}
              <AnimatePresence>
                {formData.password && (!(!validationErrors.password && passwordStrength === 100)) && (
                  <motion.div
                    initial={{ opacity: 0, height: 'auto', y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10, transition: { duration: 0.2 } }}
                  >
                    {/* Password strength indicator */}
                    <motion.div
                      className="h-1 mt-2 bg-gray-200 rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: getPasswordStrengthColor(passwordStrength)
                        }}
                        initial={{ width: '0%' }}
                        animate={{ width: `${passwordStrength}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>

                    {/* Password requirements */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4 space-y-2 overflow-hidden"
                    >
                      {requirements.map((req, index) => (
                        <motion.div
                          key={req.text}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <motion.div
                            animate={{
                              scale: req.met ? [1, 1.2, 1] : 1,
                              color: req.met ? '#22c55e' : '#94a3b8'
                            }}
                            className={`text-sm ${
                              req.met ? 'text-green-500' : 'text-slate-400'
                            }`}
                          >
                            {req.met ? '✓' : '○'}
                          </motion.div>
                          <span className={`text-sm ${
                            req.met ? 'text-green-500' : 'text-slate-400'
                          }`}>
                            {req.text}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || passwordStrength < 100}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-base sm:text-sm font-medium rounded-md text-white ${
                passwordStrength < 100
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[var(--color-fountain-blue-600)] hover:bg-[var(--color-fountain-blue-700)] dark:bg-[var(--color-fountain-blue-500)] dark:hover:bg-[var(--color-fountain-blue-600)]'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)]`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t('common.loading')}
                </div>
              ) : (
                t('auth.register.submit')
              )}
            </motion.button>
          </div>
        </form>

        <div className="text-center mt-4">
          <span className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]">
            {t('auth.register.hasAccount')}{' '}
          </span>
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-[var(--color-fountain-blue-700)] dark:text-[var(--color-fountain-blue-200)] hover:text-[var(--color-fountain-blue-800)] dark:hover:text-[var(--color-fountain-blue-100)] transition-colors duration-200"
          >
            {t('auth.register.signIn')}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register; 