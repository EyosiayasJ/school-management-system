import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Unauthorized = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center"
      >
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg
              className="h-10 w-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
          <p className="mt-2 text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700">
            {currentUser ? (
              <>
                You are logged in as <span className="font-medium">{currentUser.name}</span> with role <span className="font-medium">{currentUser.role}</span>.
              </>
            ) : (
              'You are not currently logged in.'
            )}
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          {currentUser ? (
            <>
              {currentUser.role === 'SUPER_ADMIN' && (
                <Link
                  to="/super-admin"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Go to Super Admin Dashboard
                </Link>
              )}
              {currentUser.role === 'SUPPORT_ADMIN' && (
                <Link
                  to="/support-admin"
                  className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  Go to Support Admin Dashboard
                </Link>
              )}
              <Link
                to="/dashboard"
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
              >
                Go to Main Dashboard
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Go to Login
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;