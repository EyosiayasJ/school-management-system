import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const InternalLogin = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!email || !password) {
        setError('Please enter both email and password');
        setIsLoading(false);
        return;
      }
      
      // Test credentials for different roles
      let userData = null;
      
      if (email === 'teacher@school.com') {
        userData = {
          id: '1',
          name: 'Sarah Johnson',
          email: 'teacher@school.com',
          role: 'TEACHER',
          token: 'mock-jwt-token'
        };
      } else if (email === 'director@school.com') {
        userData = {
          id: '2',
          name: 'John Director',
          email: 'director@school.com',
          role: 'BRANCH_DIRECTOR',
          token: 'mock-jwt-token'
        };
      } else if (email === 'hq@school.com') {
        userData = {
          id: '3',
          name: 'Mary HQ',
          email: 'hq@school.com',
          role: 'HQ_DIRECTOR',
          token: 'mock-jwt-token'
        };
      } else if (email === 'admin@a.com' && password === 'password') {
        userData = {
          id: '4',
          name: 'Admin User',
          email: 'admin@a.com',
          role: 'TEACHER',
          token: 'mock-jwt-token'
        };
      }
      
      if (userData) {
        // Store in localStorage AND update context
        localStorage.setItem('user', JSON.stringify(userData));
        setCurrentUser(userData);
        
        // Navigate based on role
        if (userData.role === 'TEACHER') {
          navigate('/teacher', { replace: true });
        } else {
          navigate('/school', { replace: true });
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5] relative overflow-hidden px-4">
      
      {/* Background blobs - increased intensity */}
      <div 
        className="absolute w-[800px] h-[800px] blur-[100px] opacity-70 top-[10%] left-[5%] z-0"
        style={{ background: 'radial-gradient(circle at center, #3B82F6 0%, transparent 80%)' }}
      />
      <div 
        className="absolute w-[700px] h-[700px] blur-[100px] opacity-70 bottom-[5%] right-[10%] z-0"
        style={{ background: 'radial-gradient(circle at center, #8B5CF6 0%, transparent 80%)' }}
      />

      {/* Main card */}
      <div
        className="relative z-10 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-100 backdrop-blur-sm bg-opacity-90 p-12 w-full max-w-md flex flex-col gap-6 items-center text-center"
        style={{
          boxShadow: '0 8px 30px rgba(0,0,0,0.1), inset 0 0 8px rgba(0,0,0,0.03)',
          minHeight: '600px'
        }}
      >
        {/* Logo placeholder */}
        <div className="w-[60px] h-[60px] bg-[#d1d9e6] rounded-full flex items-center justify-center text-2xl text-[#6B7280]">
          👨‍🏫
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">Staff Portal</h2>
        <p className="text-sm text-gray-500 -mt-2">For teachers and school directors</p>
        <p className="text-xs text-[#7C8B9C] -mt-2">Please login with your school credentials</p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-700 border-l-4 border-red-500 p-3 rounded-md w-full text-left">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

          {/* Email */}
          <div className="input flex flex-col items-start gap-2 w-full">
            <label htmlFor="email" className="text-sm text-[#374151]">Email Address</label>
            <div className="password-wrapper w-full relative flex items-center">
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-[14px] pr-[40px] rounded-xl border-[1.5px] border-[#E5E7EB] bg-[#F3F4F6] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E90FF] focus:shadow-[0_0_0_4px_rgba(30,144,255,0.2)] transition-all"
                placeholder="you@school.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="input flex flex-col items-start gap-2 w-full">
            <label htmlFor="password" className="text-sm text-[#374151]">Password</label>
            <div className="password-wrapper w-full relative flex items-center">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-[14px] pr-[40px] rounded-xl border-[1.5px] border-[#E5E7EB] bg-[#F3F4F6] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E90FF] focus:shadow-[0_0_0_4px_rgba(30,144,255,0.2)] transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-[14px] text-[#6B7280] cursor-pointer select-none"
              >
                <span className="material-icons" style={{ fontSize: '20px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Help Message */}
          <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-md text-left border-l-4 border-blue-500">
            <p className="font-semibold">Test Credentials:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Teacher: teacher@school.com (any password)</li>
              <li>Director: director@school.com (any password)</li>
              <li>HQ: hq@school.com (any password)</li>
            </ul>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between w-full text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="rounded border-gray-300 text-blue-600 focus:ring-0"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="primary-button w-full mt-4 py-3 text-white bg-[#1E90FF] rounded-xl font-semibold text-base hover:bg-[#1A7FDB] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <span className="material-icons animate-spin">autorenew</span> Logging in...
              </span>
            ) : 'Login'}
          </button>

          {/* Switch to Other Login Portals */}
          <div className="mt-4 text-sm text-gray-600">
            <span>Student or parent? </span>
            <Link to="/login/external" className="text-blue-600 hover:underline">
              Login to student portal
            </Link>
          </div>
          <div className="mt-1 text-sm text-gray-600">
            <span>Platform administrator? </span>
            <Link to="/login/admin" className="text-blue-600 hover:underline">
              Login to admin portal
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};

export default InternalLogin;