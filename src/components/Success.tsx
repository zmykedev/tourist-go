import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { API_ENDPOINTS } from '../config/api';

type UserRole = 'tourist' | 'driver' | null;

const Success: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuth, user } = useAuth();
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleInitialAuth = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const name = params.get('name');
      const email = params.get('email');
      
      if (!token || !name || !email) {
        navigate('/login', { replace: true });
        return;
      }

      // We only store the token if it doesn't exist
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', token);
        await checkAuth();
      }

      setShowRoleSelection(true);
    };

    handleInitialAuth();
  }, [location, navigate, checkAuth]);

  // Effect to redirect if the user already has a role
  useEffect(() => {
    if (user?.role === 'tourist') {
      navigate('/tourist-request', { replace: true });
    } else if (user?.role === 'driver') {
      navigate('/driver-registration', { replace: true });
    }
  }, [user, navigate]);

  const handleRoleSelection = async (role: UserRole) => {
    if (!role) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(API_ENDPOINTS.AUTH.UPDATE_ROLE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role })
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      // Update authentication state after updating the role
      await checkAuth();
      
      // Redirection will be handled in the useEffect that observes user.role
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  // If the user already has a role, we don't show anything while redirecting
  if (user?.role) {
    return null;
  }

  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="max-w-md w-full space-y-8 p-8 bg-white/80 backdrop-blur-sm dark:bg-[var(--color-fountain-blue-800)]/90 rounded-2xl shadow-xl border border-[var(--color-fountain-blue-100)] dark:border-[var(--color-fountain-blue-700)]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div 
          className="text-center"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {!showRoleSelection ? (
            <>
              <motion.div 
                className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[var(--color-fountain-blue-100)] dark:bg-[var(--color-fountain-blue-700)]"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <svg className="h-8 w-8 text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <motion.h2 
                className="mt-6 text-4xl font-extrabold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Authenticating...
              </motion.h2>
            </>
          ) : (
            <>
              <motion.h2 
                className="text-3xl font-bold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)] mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                How would you like to use TuristGo?
              </motion.h2>
              
              <div className="space-y-4">
                <motion.button
                  onClick={() => handleRoleSelection('tourist')}
                  className="w-full p-4 rounded-xl border-2 border-[var(--color-fountain-blue-200)] hover:border-[var(--color-fountain-blue-400)] dark:border-[var(--color-fountain-blue-700)] dark:hover:border-[var(--color-fountain-blue-500)] transition-all duration-200"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)]">
                    Tourist
                  </h3>
                  <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)] mt-2">
                    I'm looking for unique tourist experiences
                  </p>
                </motion.button>

                <motion.button
                  onClick={() => handleRoleSelection('driver')}
                  className="w-full p-4 rounded-xl border-2 border-[var(--color-fountain-blue-200)] hover:border-[var(--color-fountain-blue-400)] dark:border-[var(--color-fountain-blue-700)] dark:hover:border-[var(--color-fountain-blue-500)] transition-all duration-200"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h3 className="text-xl font-semibold text-[var(--color-fountain-blue-900)] dark:text-[var(--color-fountain-blue-100)]">
                    Driver
                  </h3>
                  <p className="text-sm text-[var(--color-fountain-blue-600)] dark:text-[var(--color-fountain-blue-300)] mt-2">
                    I want to offer tourist transportation services
                  </p>
                </motion.button>
              </div>

              {error && (
                <motion.p
                  className="mt-4 text-red-600 dark:text-red-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}

              {isLoading && (
                <motion.div
                  className="mt-4 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Success;