import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';

/**
 * ProtectedRoute component - Wraps routes that require authentication
 * Redirects unauthenticated users to the login page
 * Validates JWT tokens and handles token expiration
 * Implements role-based access control
 */
const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredRoles = [], // Support for multiple required roles
  redirectPath = '/login',
  adminRedirectPath = '/admin/login' // Separate redirect for admin routes
}) => {
  const { isAuthenticated, hasRole, validateToken, currentUser, loading } = useAuth();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // Check if the route requires admin access
  const isAdminRoute = requiredRole === 'admin' || requiredRoles.includes('admin');
  const actualRedirectPath = isAdminRoute ? adminRedirectPath : redirectPath;

  // Validate token on component mount
  useEffect(() => {
    const checkToken = async () => {
      try {
        setIsValidating(true);
        const valid = await validateToken();
        setIsValid(valid);
      } catch (error) {
        console.error('Token validation error:', error);
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    checkToken();
  }, [validateToken]);

  // Show loading state while validating token
  if (isValidating || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated() || !isValid) {
    return <Navigate to={actualRedirectPath} state={{ from: location.pathname }} replace />;
  }

  // Check for single required role
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check for multiple required roles (if any one is required)
  if (requiredRoles.length > 0 && !requiredRoles.some(role => hasRole(role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If authenticated and has required role(s), render the route
  return children;
};

export default ProtectedRoute;