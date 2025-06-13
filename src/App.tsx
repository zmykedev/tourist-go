import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './views/common/Login';
import Register from './views/common/Register';
import Selection from './components/Selection';
import LandingPage from './views/common/LandingPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './views/common/Layout';
import Navbar from './components/Navbar';
import TouristRequest from './views/tourist/Tourist-Request';
import DriverForm from './views/driver/DriverForm';
import DriverList from './components/DriverList';
import TouristSuccess from './views/tourist/Tourist-Success';
import Success from './components/Success';
import DriverSuccess from './components/DriverSuccess';
import Profile from './views/common/Profile'; // Added Profile import
import Bookings from './views/tourist/Bookings';

function AppContent() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-fountain-blue-50)] dark:bg-[var(--color-fountain-blue-900)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[var(--color-fountain-blue-500)]"></div>
      </div>
    );
  }

  return (
    <Layout>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        
        {/* Protected routes */}
        {user ? (
          <>
            <Route path="/selection" element={<Selection />} />
            <Route path="/profile" element={<Profile />} /> {/* Added Profile route */}
            
            {/* Tourist routes */}
            {user.role === 'tourist' && (
              <>
                <Route path="/tourist-request" element={<TouristRequest />} />
                <Route path="/drivers" element={<DriverList />} />
                <Route path="/tourist-success" element={<TouristSuccess />} />
              <Route path="/bookings" element={<Bookings />} />
              </>
            )}
            
            {/* Driver routes */}
            {user.role === 'driver' && (<>
              <Route path="/driver-registration" element={<DriverForm />} />
              <Route path="/driver-success" element={<DriverSuccess />} />
              </>
            )}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Layout>
  );
}

function App() {
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

export default App;
