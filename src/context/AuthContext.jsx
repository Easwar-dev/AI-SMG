/**
 * Auth Context
 * Manages authentication state across the application
 */

import { createContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import { tokenStorage } from '../utils/tokenStorage';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Check if token is expired
   */
  const isTokenExpired = useCallback((token) => {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (e) {
      return true;
    }
  }, []);

  /**
   * Hydrate auth state from localStorage on app mount
   */
  const hydrateFromStorage = useCallback(async () => {
    try {
      setLoading(true);
      const tokens = tokenStorage.getTokens();

      if (!tokens) {
        setLoading(false);
        return;
      }

      // Check if access token is expired
      if (isTokenExpired(tokens.accessToken)) {
        // Try to refresh if refresh token exists
        if (tokens.refreshToken && !isTokenExpired(tokens.refreshToken)) {
          try {
            const response = await authService.refreshToken(tokens.refreshToken);
            tokenStorage.saveTokens(
              response.access_token,
              tokens.refreshToken,
              tokens.rememberMe
            );

            // Fetch user info with new token
            const userResponse = await authService.getCurrentUser();
            setUser(userResponse.user);
            setError(null);
          } catch (err) {
            tokenStorage.clearTokens();
            setUser(null);
            setError(null);
          }
        } else {
          tokenStorage.clearTokens();
          setUser(null);
        }
      } else {
        // Access token is still valid, fetch user info
        try {
          const userResponse = await authService.getCurrentUser();
          setUser(userResponse.user);
          setError(null);
        } catch (err) {
          // Token might be invalid despite not being expired
          tokenStorage.clearTokens();
          setUser(null);
        }
      }
    } catch (err) {
      console.error('Error hydrating auth state:', err);
      setError(null);
    } finally {
      setLoading(false);
    }
  }, [isTokenExpired]);

  /**
   * Sign up user
   */
  const signup = useCallback(async (name, email, password, confirmPassword) => {
    try {
      setError(null);
      const response = await authService.signup(name, email, password, confirmPassword);

      // Save tokens
      tokenStorage.saveTokens(response.access_token, response.refresh_token, false);

      // Set user
      setUser(response.user);

      return response;
    } catch (err) {
      const errorMessage = err.message || 'Signup failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Login user
   */
  const login = useCallback(async (email, password, rememberMe = false) => {
    try {
      setError(null);
      const response = await authService.login(email, password);

      // Save tokens
      tokenStorage.saveTokens(response.access_token, response.refresh_token, rememberMe);

      // Set user
      setUser(response.user);

      return response;
    } catch (err) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    try {
      // Call logout endpoint to invalidate refresh token on backend
      await authService.logout();
    } catch (err) {
      // Even if logout fails, clear local state
      console.error('Error during logout:', err);
    } finally {
      // Clear tokens and user
      tokenStorage.clearTokens();
      setUser(null);
      setError(null);
    }
  }, []);

  /**
   * Request password reset
   */
  const forgotPassword = useCallback(async (email) => {
    try {
      setError(null);
      const response = await authService.forgotPassword(email);
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to send reset email';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Reset password
   */
  const resetPassword = useCallback(async (token, newPassword, confirmPassword) => {
    try {
      setError(null);
      const response = await authService.resetPassword(token, newPassword, confirmPassword);
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to reset password';
      setError(errorMessage);
      throw err;
    }
  }, []);

  /**
   * Initialize auth on mount
   */
  useEffect(() => {
    hydrateFromStorage();
  }, [hydrateFromStorage]);

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
