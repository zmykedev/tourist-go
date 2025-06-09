import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import Register from './components/Register';
import Selection from './components/Selection';
import TouristRequest from './components/TouristRequest';
import Navbar from './components/Navbar';
import DriverForm from './components/DriverForm';
import DriverList from './components/DriverList';
import DriverSuccess from './components/DriverSuccess';
import TouristSuccess from './components/TouristSuccess';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import GoogleLogin from './components/GoogleLogin';

function AppContent() {
  const { user, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-fountain-blue-50)] to-[var(--color-fountain-blue-100)] dark:from-[var(--color-fountain-blue-900)] dark:to-[var(--color-fountain-blue-800)]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={
        isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
          </div>
        ) : user ? (
          <Navigate to="/" replace />
        ) : (
          <Login />
        )
      } />
      <Route path="/register" element={
        isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
          </div>
        ) : user ? (
          <Navigate to="/" replace />
        ) : (
          <Register />
        )
      } />
      <Route path="/auth/google/callback" element={<GoogleLogin />} />

      {/* Protected routes with Layout */}
      <Route element={<Layout><Navbar userName={user?.name} userEmail={user?.email} /></Layout>}>
        <Route path="/" element={
          isLoading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
            </div>
          ) : user ? (
            <Selection />
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/tourist-request" element={user ? <TouristRequest /> : <Navigate to="/login" replace />} />
        <Route path="/driver-registration" element={user ? <DriverForm /> : <Navigate to="/login" replace />} />
        <Route path="/drivers" element={user ? <DriverList /> : <Navigate to="/login" replace />} />
        <Route path="/driver-success" element={user ? <DriverSuccess /> : <Navigate to="/login" replace />} />
        <Route path="/tourist-success" element={user ? <TouristSuccess /> : <Navigate to="/login" replace />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router basename="/">
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
