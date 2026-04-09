/**
 * Forgot Password Page
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Toaster, toast } from 'react-hot-toast';

export const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setLoading(true);

    try {
      await forgotPassword(email);
      setSubmitted(true);
      toast.success('Check your email for reset instructions');
    } catch (error) {
      // Don't reveal if email exists for security
      setSubmitted(true);
      toast.success('If an account exists, check your email for reset instructions');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <div className="bg-slate-800 rounded-lg shadow-xl p-8 text-center">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Check Your Email
              </h2>
              <p className="text-gray-400 mb-6">
                We've sent password reset instructions to your email. Please follow the link to reset your password.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                Didn't receive an email? Check your spam folder or{' '}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-blue-400 hover:text-blue-300 font-semibold"
                >
                  try again
                </button>
              </p>
              <Link
                to="/login"
                className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-800 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">
              Reset Password
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Enter your email and we'll send you a link to reset your password
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 bg-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 ${
                    error ? 'ring-red-500' : 'focus:ring-blue-500'
                  }`}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition duration-300 mt-6"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            {/* Back to Login */}
            <p className="text-center text-gray-400 mt-6">
              Remember your password?{' '}
              <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
