/**
 * API Client with JWT token handling
 * Handles automatic token refresh and request/response interceptors
 */

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { tokenStorage } from '../utils/tokenStorage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Track if we're currently refreshing token to prevent multiple refresh requests
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

/**
 * Request interceptor - attach access token to requests
 */
api.interceptors.request.use(
  (config) => {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - handle 401 errors and refresh token
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Token refresh is already in progress, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        // No refresh token available, redirect to login
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Attempt to refresh token
      return api.post('/auth/refresh', { refresh_token: refreshToken })
        .then((response) => {
          const { access_token } = response.data;
          const currentTokens = tokenStorage.getTokens();
          
          // Save new access token but keep refresh token
          tokenStorage.saveTokens(
            access_token,
            currentTokens.refreshToken,
            currentTokens.rememberMe
          );

          api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

          processQueue(null, access_token);

          return api(originalRequest);
        })
        .catch((err) => {
          // Refresh failed, clear tokens and redirect to login
          tokenStorage.clearTokens();
          window.location.href = '/login';
          processQueue(err, null);
          return Promise.reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    }

    return Promise.reject(error);
  }
);

export default api;
