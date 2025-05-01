import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';

/**
 * RoleBasedRoute component - Protects routes based on user roles
 * Redirects unauthenticated users to the login page
 * Redirects unauthorized users to an unauthorized page
 * Validates JWT tokens and handles token expiration
 */
const RoleBasedRoute = ({ 
  children, 
  requiredRole = null, 
  requiredRoles = [], // Support for multiple required roles
  redirectPath = '/login',
}) => {
  const { isAuthenticated, hasRole, validateToken, currentUser, loading } = useAuth();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

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
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
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

export default RoleBasedRoute;