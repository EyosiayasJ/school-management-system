/**
 * Authentication Service
 * 
 * Provides functions to interact with authentication-related API endpoints
 * for user login, logout, password reset, and session management.
 * 
 * @module authService
 */

import { mockSuccess, mockError } from '../helpers';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'SUPER_ADMIN',
    token: 'mock-jwt-token-admin'
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@example.com',
    role: 'TEACHER',
    token: 'mock-jwt-token-teacher'
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@example.com',
    role: 'STUDENT',
    token: 'mock-jwt-token-student'
  }
];

/**
 * Login a user with email and password
 * 
 * @async
 * @function login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} User data with token
 */
export const login = async (email, password) => {
  try {
    // For demo purposes, any password works with the mock emails
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return mockError('Invalid email or password', 401);
    }
    
    // In a real implementation, this would verify the password
    // For demo, we'll just return the user
    
    return mockSuccess({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: user.token
    });
  } catch (error) {
    return mockError('Login failed');
  }
};

/**
 * Request a password reset
 * 
 * @async
 * @function requestPasswordReset
 * @param {string} email - User email
 * @returns {Promise<Object>} Success message
 */
export const requestPasswordReset = async (email) => {
  try {
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      // For security reasons, don't reveal if the email exists or not
      return mockSuccess({ message: 'If your email is registered, you will receive a password reset link shortly.' });
    }
    
    // In a real implementation, this would send an email with a reset link
    
    return mockSuccess({ message: 'If your email is registered, you will receive a password reset link shortly.' });
  } catch (error) {
    return mockError('Failed to process password reset request');
  }
};

/**
 * Reset password with token
 * 
 * @async
 * @function resetPassword
 * @param {string} token - Reset token
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Success message
 */
export const resetPassword = async (token, newPassword) => {
  try {
    // In a real implementation, this would verify the token and update the password
    
    return mockSuccess({ message: 'Password has been reset successfully. You can now log in with your new password.' });
  } catch (error) {
    return mockError('Failed to reset password. The link may have expired.');
  }
};

/**
 * Verify authentication token
 * 
 * @async
 * @function verifyToken
 * @param {string} token - JWT token
 * @returns {Promise<Object>} User data
 */
export const verifyToken = async (token) => {
  try {
    const user = mockUsers.find(u => u.token === token);
    
    if (!user) {
      return mockError('Invalid or expired token', 401);
    }
    
    return mockSuccess({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    return mockError('Failed to verify token');
  }
};

/**
 * Logout user (invalidate token)
 * 
 * @async
 * @function logout
 * @returns {Promise<Object>} Success message
 */
export const logout = async () => {
  try {
    // In a real implementation, this might invalidate the token on the server
    
    return mockSuccess({ message: 'Logged out successfully' });
  } catch (error) {
    return mockError('Failed to logout');
  }
};