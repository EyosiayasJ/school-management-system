// import axios from 'axios';
// Remove unused import
// import { toast } from 'react-hot-toast';
import { API_BASE_URL, API_TIMEOUT, ENDPOINTS } from '../config/api.config';
// Remove circular dependency by defining roles locally instead of importing
// import { ROLES } from '../contexts/AuthContext';

// Define roles locally to avoid circular dependency
const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SUPPORT_ADMIN: 'SUPPORT_ADMIN',
  BRANCH_DIRECTOR: 'BRANCH_DIRECTOR',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT'
};

// Mock implementation helpers
const mockSuccess = (data) => {
  return Promise.resolve({ data });
};

const mockError = (message, status = 400) => {
  const error = new Error(message);
  error.response = {
    data: { message },
    status
  };
  return Promise.reject(error);
};

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@a.com',
    role: ROLES.SUPER_ADMIN,
    token: 'mock-jwt-token'
  }
];

/*
// Create axios instance with default configs
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: API_TIMEOUT,
});

// Interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle auth errors and other common responses
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    // Handle authentication errors
    if (response && response.status === 401) {
      // Check if this is not the login endpoint
      if (!error.config.url.includes('login')) {
        localStorage.removeItem('user');
        toast.error('Your session has expired. Please log in again.');
        window.location.href = '/login';
      }
    }
    
    // Show error toast for 400-level errors
    if (response && response.status >= 400 && response.status < 500) {
      const message = response.data?.message || 'An error occurred';
      toast.error(message);
    }
    
    // Show error toast for 500-level errors
    if (response && response.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    
    // Network errors
    if (!response) {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);
*/

// Mock API Endpoints (replace actual API calls with mock responses)
const endpoints = {
  // Auth endpoints
  auth: {
    login: (credentials) => {
      if (credentials.email === 'admin@a.com' && credentials.password === 'password') {
        return mockSuccess({ user: mockUsers[0] });
      }
      return mockError('Invalid credentials');
    },
    loginInternal: (credentials) => {
      if (credentials.email === 'admin@a.com' && credentials.password === 'password') {
        return mockSuccess({ user: {...mockUsers[0], role: ROLES.TEACHER} });
      }
      return mockError('Invalid credentials');
    },
    loginExternal: (credentials) => {
      if (credentials.email === 'admin@a.com' && credentials.password === 'password') {
        return mockSuccess({ user: {...mockUsers[0], role: ROLES.STUDENT} });
      }
      return mockError('Invalid credentials');
    },
    loginAdmin: (credentials) => {
      if (credentials.email === 'admin@a.com' && credentials.password === 'password') {
        return mockSuccess({ user: mockUsers[0] });
      }
      return mockError('Invalid credentials');
    },
    logout: () => mockSuccess({ message: 'Logged out successfully' }),
    forgotPassword: (_email) => mockSuccess({ message: 'Password reset email sent' }),
    resetPassword: (_data) => mockSuccess({ message: 'Password reset successfully' }),
    verifyToken: () => mockSuccess({ valid: true }),
  },
  
  // Schools endpoints
  schools: {
    getAll: (_params) => mockSuccess({ items: [], total: 0 }),
    getById: (id) => mockSuccess({ id, name: 'Mock School', location: 'City, Country' }),
    create: (data) => mockSuccess({ ...data, id: 'new-school-id' }),
    update: (id, data) => mockSuccess({ ...data, id }),
    delete: (_id) => mockSuccess({ success: true }),
    getStats: () => mockSuccess({ totalSchools: 5, activeSchools: 4 }),
  },
  
  // Branches endpoints
  branches: {
    getAll: (_params) => mockSuccess({ items: [], total: 0 }),
    getBySchoolId: (_schoolId) => mockSuccess({ items: [], total: 0 }),
    getById: (id) => mockSuccess({ id, name: 'Mock Branch', address: 'Branch Address' }),
    create: (data) => mockSuccess({ ...data, id: 'new-branch-id' }),
    update: (id, data) => mockSuccess({ ...data, id }),
    delete: (_id) => mockSuccess({ success: true }),
  },
  
  // Users endpoints
  users: {
    getAll: (params) => mockSuccess({ items: mockUsers, total: mockUsers.length }),
    getById: (id) => mockSuccess(mockUsers[0]),
    create: (data) => mockSuccess({ ...data, id: 'new-user-id' }),
    update: (id, data) => mockSuccess({ ...data, id }),
    delete: (id) => mockSuccess({ success: true }),
    updateProfile: (data) => mockSuccess({ ...data }),
    changePassword: (data) => mockSuccess({ success: true }),
  },
  
  // Settings endpoints
  settings: {
    getGlobal: () => mockSuccess({ allowRegistration: true, enableNotifications: true }),
    updateGlobal: (data) => mockSuccess(data),
    getSchoolSettings: (schoolId) => mockSuccess({ schoolId, settings: {} }),
    updateSchoolSettings: (schoolId, data) => mockSuccess({ schoolId, settings: data }),
    getFeatureFlags: () => mockSuccess({ betaFeatures: false }),
    updateFeatureFlags: (data) => mockSuccess(data),
  },
  
  // Plans and billing endpoints
  billing: {
    getPlans: () => mockSuccess([{ id: 'plan1', name: 'Basic', price: 9.99 }]),
    getPlan: (id) => mockSuccess({ id, name: 'Basic', price: 9.99 }),
    createPlan: (data) => mockSuccess({ ...data, id: 'new-plan-id' }),
    updatePlan: (id, data) => mockSuccess({ ...data, id }),
    deletePlan: (id) => mockSuccess({ success: true }),
    getSubscriptions: (params) => mockSuccess({ items: [], total: 0 }),
    getSchoolSubscription: (schoolId) => mockSuccess({ schoolId, planId: 'plan1' }),
    updateSubscription: (subscriptionId, data) => mockSuccess({ ...data, id: subscriptionId }),
  },
  
  // Audit logs endpoints
  audit: {
    getLogs: (params) => mockSuccess({ items: [], total: 0 }),
    getLogById: (id) => mockSuccess({ id, action: 'LOGIN', timestamp: new Date().toISOString() }),
  },
};

// Mock API client
const apiClient = {
  get: (url) => mockSuccess({}),
  post: (url, data) => mockSuccess({}),
  put: (url, data) => mockSuccess({}),
  delete: (url) => mockSuccess({}),
};

export { apiClient, endpoints };

export default {
  apiClient,
  endpoints,
}; 