import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import Register from './components/Register';
import Selection from './components/Selection';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import Navbar from './components/Navbar';
import TouristRequest from './components/TouristRequest';
import DriverForm from './components/DriverForm';
import DriverList from './components/DriverList';
import TouristSuccess from './components/TouristSuccess';
import Success from './components/Success';

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
      </div>
    );
  }

  console.log('App rendered with user:', user);

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
      <Route path="/success" element={<Success />} />
      
      {/* Rutas protegidas */}
      <Route element={<Layout><Navbar userName={user?.name} userEmail={user?.email} /></Layout>}>
        {/* Ruta principal - Selección de rol */}
        <Route path="/" element={user ? <Selection /> : <Navigate to="/login" replace />} />
        
        {/* Rutas para turistas */}
        <Route 
          path="/tourist-request" 
          element={
            user?.role === 'tourist' ? 
            <TouristRequest /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/drivers" 
          element={
            user?.role === 'tourist' ? 
            <DriverList /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route 
          path="/tourist-success" 
          element={
            user?.role === 'tourist' ? 
            <TouristSuccess /> : 
            <Navigate to="/" replace />
          } 
        />

        {/* Rutas para conductores */}
        <Route 
          path="/driver-registration" 
          element={
            user?.role === 'driver' ? 
            <DriverForm /> : 
            <Navigate to="/" replace />
          } 
        />
      </Route>

      {/* Ruta para manejar URLs no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}
