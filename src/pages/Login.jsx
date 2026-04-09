/**
 * Login Page
 */

import { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ThemeContext } from '../main'
import { Toaster, toast } from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setFormError(''); // Clear previous error

    try {
      await login(formData.email, formData.password, rememberMe);

      toast.success('Login successful! Redirecting...');
      setTimeout(() => {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from);
      }, 1500);
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      setFormError(errorMessage);
      toast.error(errorMessage);
      
      // Auto-clear error after 8 seconds
      setTimeout(() => {
        setFormError('');
      }, 8000);
    } finally {
      setLoading(false);
    }
  };

  const { toggleTheme } = useContext(ThemeContext)

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gradient-to-b from-[#F0FDF4] to-[#DCFCE7] dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4 relative overflow-hidden">
        <button
          type="button"
          onClick={toggleTheme}
          className="fixed right-5 top-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200/80 bg-white/85 text-slate-700 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.55)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-900"
          aria-label="Toggle theme"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2.25M12 19.25v2.25M4.93 4.93l1.6 1.6M17.47 17.47l1.6 1.6M2.5 12h2.25M19.25 12h2.25M4.93 19.07l1.6-1.6M17.47 6.53l1.6-1.6" />
          </svg>
        </button>
        {/* Decorative blobs */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-white/55 blur-3xl dark:bg-slate-700/30" />
          <div className="absolute bottom-[-9rem] right-[-2rem] h-80 w-80 rounded-full bg-emerald-200/55 blur-3xl dark:bg-emerald-500/10" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white/40 dark:bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border border-white/60 dark:border-white/20">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white mb-2 text-center">
              Welcome Back
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-center mb-6">
              Sign in to continue to your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Alert */}
              {formError && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-500 text-sm font-medium">{formError}</span>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-800 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full px-4 py-2 bg-white/50 dark:bg-white/5 text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 border border-white/30 dark:border-white/10 ${
                    errors.email ? 'ring-red-500' : 'focus:ring-emerald-500 dark:focus:ring-emerald-400'
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-800 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 bg-white/50 dark:bg-white/5 text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 border border-white/30 dark:border-white/10 ${
                    errors.password ? 'ring-red-500' : 'focus:ring-emerald-500 dark:focus:ring-emerald-400'
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center text-slate-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 mr-2 accent-emerald-500"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition duration-300 mt-6"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Signup Link */}
            <p className="text-center text-slate-700 dark:text-gray-400 mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
