import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

interface User {
  id: number;
  email: string;
  name: string;
  google_id: string;
  created_at: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isNewLogin: boolean;
  checkAuth: () => Promise<void>;
  logout: () => void;
  updateRole: (role: string) => Promise<void>;
  setIsNewLogin: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewLogin, setIsNewLogin] = useState(false);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.AUTH.ME, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Si recibimos un 401, limpiamos la sesión
        if (response.status === 401) {
          localStorage.removeItem('token');
          setUser(null);
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRole = async (role: string) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found');

    const response = await fetch(API_ENDPOINTS.AUTH.UPDATE_ROLE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ role })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to update role');
    }

    // Actualizar el estado del usuario después de cambiar el rol
    await checkAuth();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, isNewLogin, setIsNewLogin, checkAuth, logout, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 