const API_BASE_URL = "https://golang-backend-production-8483.up.railway.app"

const API_BASE_DEV = "http://localhost:3001"


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
      BOOKINGS: `${API_BASE_URL}/api/tourists/bookings`,
    },
    BOOKINGS: {
      BASE: `${API_BASE_URL}/api/bookings`,
      TOURIST: `${API_BASE_URL}/api/bookings/tourist`,
      DRIVER: (id: string) => `${API_BASE_URL}/api/bookings/driver/${id}`,
      STATUS: (id: string) => `${API_BASE_URL}/api/bookings/${id}/status`,
      DETAILS: (id: string) => `${API_BASE_URL}/api/bookings/${id}`,
    },
  },
}; 