import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!otpSent) {
        // Stage 1: send OTP
        if (email.trim() === '') {
          setError('Please enter your registered email address.');
          setIsLoading(false);
          return;
        }
        setOtpSent(true);
      } else {
        // Stage 2: reset password
        if (!otpCode || !newPassword || !confirmPassword) {
          setError('Please fill in all fields.');
          setIsLoading(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          setError('New password and confirm password do not match.');
          setIsLoading(false);
          return;
        }
        // Successful reset simulation
        navigate('/'); // Redirect back to login page
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5] relative overflow-hidden px-4">

      {/* Background blobs */}
      <div
        className="absolute w-[700px] h-[700px] blur-[100px] opacity-70 top-[10%] left-[5%] z-0"
        style={{ background: 'radial-gradient(circle at center, #3B82F6 0%, transparent 80%)' }}
      />
      <div
        className="absolute w-[600px] h-[600px] blur-[100px] opacity-70 bottom-[5%] right-[10%] z-0"
        style={{ background: 'radial-gradient(circle at center, #8B5CF6 0%, transparent 80%)' }}
      />

      {/* Main Card */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-gray-100 backdrop-blur-sm bg-opacity-90 p-12 w-full max-w-md flex flex-col gap-6 items-center text-center"
        style={{
          boxShadow: '0 8px 30px rgba(0,0,0,0.1), inset 0 0 8px rgba(0,0,0,0.03)',
          minHeight: '600px',
        }}
      >
        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Link to="/" className="text-[#1E90FF] hover:text-blue-600">
            <span className="material-icons">arrow_back</span>
          </Link>
        </div>

        {/* Logo */}
        <div className="w-[60px] h-[60px] bg-[#d1d9e6] rounded-full flex items-center justify-center text-2xl text-[#6B7280]">
          🏫
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">Reset Your Password</h2>

        <p className="text-sm text-gray-500 -mt-2">
          {otpSent ? 'Enter the OTP and set your new password.' : 'First, enter your registered email.'}
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-700 border-l-4 border-red-500 p-3 rounded-md w-full text-left">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          {/* Email field (always visible) */}
          <div className="input flex flex-col items-start gap-2 w-full">
            <label htmlFor="email" className="text-sm text-[#374151]">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-[14px] rounded-xl border-[1.5px] border-[#E5E7EB] bg-[#F3F4F6] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E90FF] focus:shadow-[0_0_0_4px_rgba(30,144,255,0.2)] transition-all"
              placeholder="you@example.com"
              disabled={otpSent}
            />
          </div>

          {/* OTP + Password Fields (only after OTP sent) */}
          {otpSent && (
            <>
              <div className="input flex flex-col items-start gap-2 w-full">
                <label htmlFor="otp" className="text-sm text-[#374151]">OTP Code</label>
                <input
                  id="otp"
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                  className="w-full p-[14px] rounded-xl border-[1.5px] border-[#E5E7EB] bg-[#F3F4F6] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E90FF] focus:shadow-[0_0_0_4px_rgba(30,144,255,0.2)] transition-all"
                  placeholder="Enter OTP code"
                />
              </div>

              <div className="input flex flex-col items-start gap-2 w-full">
                <label htmlFor="newPassword" className="text-sm text-[#374151]">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full p-[14px] rounded-xl border-[1.5px] border-[#E5E7EB] bg-[#F3F4F6] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E90FF] focus:shadow-[0_0_0_4px_rgba(30,144,255,0.2)] transition-all"
                  placeholder="Enter new password"
                />
              </div>

              <div className="input flex flex-col items-start gap-2 w-full">
                <label htmlFor="confirmPassword" className="text-sm text-[#374151]">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full p-[14px] rounded-xl border-[1.5px] border-[#E5E7EB] bg-[#F3F4F6] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#1E90FF] focus:shadow-[0_0_0_4px_rgba(30,144,255,0.2)] transition-all"
                  placeholder="Confirm new password"
                />
              </div>
            </>
          )}

          {/* Primary Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="primary-button w-full mt-4 py-3 text-white bg-[#1E90FF] rounded-xl font-semibold text-base hover:bg-[#1A7FDB] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex justify-center items-center gap-2">
                <span className="material-icons animate-spin">autorenew</span> Processing...
              </span>
            ) : (
              otpSent ? 'Reset Password' : 'Send OTP'
            )}
          </button>
        </form>

        {/* Language Switch */}
        <div className="language-switch flex justify-center gap-2 mt-4 text-sm text-[#6B7280]">
          <span className="hover:text-[#1E90FF] cursor-pointer">🇬🇧 English</span> |
          <span className="hover:text-[#1E90FF] cursor-pointer">🇪🇹 Amharic</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
