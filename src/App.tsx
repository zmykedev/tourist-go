import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin';
import Success from './components/Success';
import TouristRequest from './components/TouristRequest';
import Main from './components/Main';
import Navbar from './components/Navbar';
import TouristForm from './components/TouristForm';
import DriverForm from './components/DriverForm';
import DriverList from './components/DriverList';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import TouristPackages from './components/TouristPackages';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';

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
      <Route path="/login" 
        element={
          isLoading ? (
            // Show loading while checking auth
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
            </div>
          ) : user ? (
            // If user is authenticated, redirect to home
            <Navigate to="/" replace />
          ) : (
            // If user is not authenticated, show login
            <GoogleLogin />
          )
        } 
      />
      <Route path="/success" element={<Success />} />

      {/* Protected routes with Layout */}
      <Route element={<Layout><Navbar userName={user?.name} userEmail={user?.email} /></Layout>}>
        <Route path="/" element={
          isLoading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-fountain-blue-500)] border-t-transparent"></div>
            </div>
          ) : user ? (
            <Main />
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/tourist-request" element={user ? <TouristRequest /> : <Navigate to="/login" replace />} />
        <Route path="/tourist-registration" element={user ? <TouristForm /> : <Navigate to="/login" replace />} />
        <Route path="/driver-registration" element={user ? <DriverForm /> : <Navigate to="/login" replace />} />
        <Route path="/drivers" element={user ? <DriverList /> : <Navigate to="/login" replace />} />
        <Route path="/tourist-packages/:driverId" element={user ? <TouristPackages /> : <Navigate to="/login" replace />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
