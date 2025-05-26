export const API_BASE_URL = 'https://golang-backend-0lxl.onrender.com';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    GOOGLE: `${API_BASE_URL}/auth/google`,
    ME: `${API_BASE_URL}/auth/me`,
    UPDATE_ROLE: `${API_BASE_URL}/auth/update-role`,
  },
  // API endpoints
  API: {
    DRIVERS: {
      BASE: `${API_BASE_URL}/api/drivers`,
      AVAILABLE: `${API_BASE_URL}/api/drivers/available`,
    },
    TOURISTS: {
      BASE: `${API_BASE_URL}/api/tourists`,
    },
  },
}; 