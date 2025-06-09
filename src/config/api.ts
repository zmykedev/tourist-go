const API_BASE_URL = `https://${import.meta.env.VITE_RAILWAY_SERVICE_NAME}-${import.meta.env.VITE_RAILWAY_ENVIRONMENT_NAME}.up.railway.app`


export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    GOOGLE: `${API_BASE_URL}/auth/google`,
    ME: `${API_BASE_URL}/auth/me`,
    UPDATE_ROLE: `${API_BASE_URL}/auth/update-role`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
  },
  // API endpoints
  API: {
    DRIVERS: {
      BASE: `${API_BASE_URL}/api/drivers`,
      AVAILABLE: `${API_BASE_URL}/api/drivers/available`,
    },
    TOURISTS: {
      BASE: `${API_BASE_URL}/api/tourists`,
      BOOK_DRIVER: `${API_BASE_URL}/api/tourists/book-driver`,
      REQUEST: `${API_BASE_URL}/api/tourists/request`,
    },
  },
}; 