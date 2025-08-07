// API Configuration
// This allows switching between local development and production backend

const API_CONFIG = {
  // Use production Railway backend
  BASE_URL: 'https://web-production-aaeaf.up.railway.app',
  
  // API endpoints
  ENDPOINTS: {
    LOGIN: '/api/auth/login/',
    REGISTER: '/api/auth/register/',
    LOGOUT: '/api/auth/logout/',
    PROFILE: '/api/auth/profile/',
    PROFILE_UPDATE: '/api/auth/profile/update/'
  }
};

// Helper function to build full API URLs
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Export the base URL for direct use
export const API_BASE_URL = API_CONFIG.BASE_URL;

// Export individual endpoint URLs
export const API_URLS = {
  LOGIN: getApiUrl(API_CONFIG.ENDPOINTS.LOGIN),
  REGISTER: getApiUrl(API_CONFIG.ENDPOINTS.REGISTER),
  LOGOUT: getApiUrl(API_CONFIG.ENDPOINTS.LOGOUT),
  PROFILE: getApiUrl(API_CONFIG.ENDPOINTS.PROFILE),
  PROFILE_UPDATE: getApiUrl(API_CONFIG.ENDPOINTS.PROFILE_UPDATE)
};

export default API_CONFIG;