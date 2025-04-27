import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@school.com' && password === 'password') {
        onLogin();
        navigate('/dashboard', { replace: true });
      } else {
        setError('Invalid email or password');
      }
      setIsLoading(false);
    }, 1000);
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
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-100 backdrop-blur-sm bg-opacity-90 p-12 w-full max-w-md flex flex-col gap-6 items-center text-center"
        style={{
          boxShadow: '0 8px 30px rgba(0,0,0,0.1), inset 0 0 8px rgba(0,0,0,0.03)',
          minHeight: '600px'
        }}
      >
        {/* Logo placeholder */}
        <div className="w-[60px] h-[60px] bg-[#d1d9e6] rounded-full flex items-center justify-center text-2xl text-[#6B7280]">
          🏫
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-sm text-gray-500 -mt-2">Please login to your account</p>
        <p className="text-xs text-[#7C8B9C] -mt-2">Manage your school effortlessly</p>

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
                placeholder="example@email.com"
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
            ) : 'Login In'}
          </button>

          {/* Language Switch */}
          <div className="language-switch flex justify-center gap-2 mt-4 text-sm text-[#6B7280]">
            <span className="hover:text-[#1E90FF] cursor-pointer">🇬🇧 English</span> | 
            <span className="hover:text-[#1E90FF] cursor-pointer">🇪🇹 Amharic</span>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default Login;
