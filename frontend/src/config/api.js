const API_CONFIG = {
  baseURL: 'http://localhost:8081/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// API endpoints
export const API_ENDPOINTS = {
  // Health & Test
  health: '/health',
  test: '/test',
  
  // Main APIs
  tasks: '/tasks',
  projects: '/projects',
  dashboard: '/dashboard/stats',
  
  // Future endpoints
  users: '/users',
  auth: '/auth',
  notifications: '/notifications'
};

export default API_CONFIG;