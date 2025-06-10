import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from '../config/api';
import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';

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
  const navigate = useNavigate();

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
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el registro');
      }

      navigate('/login', { state: { message: 'Registro exitoso. Por favor, inicia sesión.' } });
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
        setError('Error en el registro');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = API_ENDPOINTS.AUTH.GOOGLE;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof RegisterFormData, value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm dark:bg-[var(--color-fountain-blue-800)]/90 rounded-2xl shadow-xl"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)]">
            Crear una cuenta
          </h2>
        </div>

        {/* Google 
        <div>
          <motion.button
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)]"
          >
            <FcGoogle className="w-5 h-5" />
            <span>Registrarse con Google</span>
          </motion.button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-[var(--color-fountain-blue-800)] text-gray-500 dark:text-gray-400">
              O
            </span>
          </div>
        </div>
Login Button */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-400)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 focus:outline-none focus:ring-[var(--color-fountain-blue-500)] focus:border-[var(--color-fountain-blue-500)]"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-400)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 focus:outline-none focus:ring-[var(--color-fountain-blue-500)] focus:border-[var(--color-fountain-blue-500)]"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[var(--color-fountain-blue-300)] dark:border-[var(--color-fountain-blue-600)] placeholder-[var(--color-fountain-blue-400)] dark:placeholder-[var(--color-fountain-blue-400)] text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] bg-white/50 dark:bg-[var(--color-fountain-blue-900)]/50 focus:outline-none focus:ring-[var(--color-fountain-blue-500)] focus:border-[var(--color-fountain-blue-500)]"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--color-fountain-blue-600)] hover:bg-[var(--color-fountain-blue-700)] dark:bg-[var(--color-fountain-blue-500)] dark:hover:bg-[var(--color-fountain-blue-600)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-fountain-blue-500)]"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Registrarse'
              )}
            </motion.button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)] hover:text-[var(--color-fountain-blue-800)] dark:hover:text-[var(--color-fountain-blue-100)]"
          >
            ¿Ya tienes una cuenta? Inicia sesión
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register; 