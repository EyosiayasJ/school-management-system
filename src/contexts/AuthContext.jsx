import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { endpoints } from '../services/api';

const AuthContext = createContext();

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SUPPORT_ADMIN: 'SUPPORT_ADMIN',
  BRANCH_DIRECTOR: 'BRANCH_DIRECTOR',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
  PARENT: 'PARENT'
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType = 'admin') => {
    try {
      let response;
      const credentials = { email, password };
      
      // Use the proper login endpoint based on user type
      if (userType === 'admin') {
        response = await endpoints.auth.loginAdmin(credentials);
      } else if (userType === 'internal') {
        response = await endpoints.auth.loginInternal(credentials);
      } else if (userType === 'external') {
        response = await endpoints.auth.loginExternal(credentials);
      } else {
        // Default to regular login
        response = await endpoints.auth.login(credentials);
      }
      
      const userData = response.data.user;
      
      // Store user data
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      toast.success(`Welcome back, ${userData.name}`);
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint if user is logged in
      if (currentUser) {
        await endpoints.auth.logout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state even if API call fails
      setCurrentUser(null);
      localStorage.removeItem('user');
      toast.success('Logged out successfully');
    }
  };

  const validateToken = async () => {
    try {
      // Call API to verify token
      await endpoints.auth.verifyToken();
      return true;
    } catch (error) {
      console.error('Token validation error:', error);
      // If token is invalid, log user out
      if (currentUser) {
        logout();
      }
      return false;
    }
  };

  const isAuthenticated = () => {
    return !!currentUser;
  };

  const hasRole = (role) => {
    if (!currentUser) return false;
    
    // If checking for an array of roles
    if (Array.isArray(role)) {
      return role.includes(currentUser.role);
    }
    
    // If checking for a single role
    return currentUser.role === role;
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    validateToken,
    isAuthenticated,
    hasRole,
    setCurrentUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;