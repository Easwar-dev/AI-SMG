/**
 * Signup Page
 */

import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ThemeContext } from '../main'
import { Toaster, toast } from 'react-hot-toast';

export const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Password must contain an uppercase letter';
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = 'Password must contain a lowercase letter';
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = 'Password must contain a number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    try {
      await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword
      );

      toast.success('Signup successful! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      const errorMessage = error.message || 'Signup failed. Please try again.';
      toast.error(errorMessage);
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
              Create Account
            </h2>
            <p className="text-slate-600 dark:text-gray-400 text-center mb-6">
              Join us to start creating amazing content
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-slate-800 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 bg-white/50 dark:bg-white/5 text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 border border-white/30 dark:border-white/10 ${
                    errors.name ? 'ring-red-500' : 'focus:ring-emerald-500 dark:focus:ring-emerald-400'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

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
                <p className="text-xs text-slate-600 dark:text-gray-400 mt-2">
                  Must be 8+ chars with uppercase, lowercase, and number
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-800 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 bg-white/50 dark:bg-white/5 text-slate-950 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 border border-white/30 dark:border-white/10 ${
                    errors.confirmPassword ? 'ring-red-500' : 'focus:ring-emerald-500 dark:focus:ring-emerald-400'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition duration-300 mt-6"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-slate-700 dark:text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
