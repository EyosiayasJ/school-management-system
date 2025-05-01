/**
 * API Configuration
 * 
 * This file contains configuration for the API service.
 * Update these values to match your backend server configuration.
 */

// API base URL - change this to your backend API URL
export const API_BASE_URL = 'https://api.schoolmanagement.com/api/v1';

// Default timeout for API requests in milliseconds
export const API_TIMEOUT = 30000;

// API version
export const API_VERSION = 'v1';

// API endpoints
export const ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  
  // Users
  USERS: `${API_BASE_URL}/users`,
  USER_PROFILE: `${API_BASE_URL}/users/profile`,
  
  // Teachers
  TEACHERS: `${API_BASE_URL}/teachers`,
  TEACHER_CLASSES: `${API_BASE_URL}/teachers/classes`,
  TEACHER_SCHEDULE: `${API_BASE_URL}/teachers/schedule`,
  
  // Classes
  CLASSES: `${API_BASE_URL}/classes`,
  CLASS_DETAIL: (classId) => `${API_BASE_URL}/classes/${classId}`,
  CLASS_STUDENTS: (classId) => `${API_BASE_URL}/classes/${classId}/students`,
  
  // Attendance
  ATTENDANCE: `${API_BASE_URL}/attendance`,
  CLASS_ATTENDANCE: (classId) => `${API_BASE_URL}/attendance/class/${classId}`,
  
  // Assignments
  ASSIGNMENTS: `${API_BASE_URL}/assignments`,
  CLASS_ASSIGNMENTS: (classId) => `${API_BASE_URL}/assignments/class/${classId}`,
  ASSIGNMENT_DETAIL: (assignmentId) => `${API_BASE_URL}/assignments/${assignmentId}`,
  ASSIGNMENT_SUBMISSIONS: (assignmentId) => `${API_BASE_URL}/assignments/${assignmentId}/submissions`,
  
  // Grades
  GRADES: `${API_BASE_URL}/grades`,
  CLASS_GRADES: (classId) => `${API_BASE_URL}/grades/class/${classId}`,
  STUDENT_GRADES: (studentId) => `${API_BASE_URL}/grades/student/${studentId}`,
  
  // Resources
  RESOURCES: `${API_BASE_URL}/resources`,
  CLASS_RESOURCES: (classId) => `${API_BASE_URL}/resources/class/${classId}`,
  
  // Messages
  MESSAGES: `${API_BASE_URL}/messages`,
  MESSAGE_THREADS: `${API_BASE_URL}/messages/threads`,
  
  // Notifications
  NOTIFICATIONS: `${API_BASE_URL}/notifications`,
};

// API headers
export const getHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Error messages
export const ERROR_MESSAGES = {
  DEFAULT: 'Something went wrong. Please try again later.',
  NETWORK: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER: 'Server error. Please try again later.',
  VALIDATION: 'Validation error. Please check your input.',
};

export default {
  API_BASE_URL,
  API_TIMEOUT,
  API_VERSION,
  ENDPOINTS,
  getHeaders,
  ERROR_MESSAGES,
}; 