/**
 * Token Storage Utility
 * Handles localStorage persistence of JWT tokens
 */

const TOKEN_STORAGE_KEY = 'ai_smg_tokens';
const REMEMBER_ME_KEY = 'ai_smg_remember_me';

export const tokenStorage = {
  /**
   * Save tokens to localStorage
   * @param {string} accessToken - JWT access token
   * @param {string} refreshToken - JWT refresh token
   * @param {boolean} rememberMe - Whether to persist tokens across sessions
   */
  saveTokens: (accessToken, refreshToken, rememberMe = false) => {
    const tokens = {
      accessToken,
      refreshToken,
      rememberMe,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
    if (rememberMe) {
      localStorage.setItem(REMEMBER_ME_KEY, 'true');
    }
  },

  /**
   * Get access token from localStorage
   * @returns {string | null} Access token or null if not found
   */
  getAccessToken: () => {
    const tokens = tokenStorage.getTokens();
    return tokens ? tokens.accessToken : null;
  },

  /**
   * Get refresh token from localStorage
   * @returns {string | null} Refresh token or null if not found
   */
  getRefreshToken: () => {
    const tokens = tokenStorage.getTokens();
    return tokens ? tokens.refreshToken : null;
  },

  /**
   * Get all tokens from localStorage
   * @returns {object | null} Tokens object or null if not found
   */
  getTokens: () => {
    try {
      const data = localStorage.getItem(TOKEN_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error parsing tokens from localStorage:', e);
      return null;
    }
  },

  /**
   * Check if remember me is enabled
   * @returns {boolean} True if remember me was enabled
   */
  isRememberMeEnabled: () => {
    return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
  },

  /**
   * Clear all tokens from localStorage
   */
  clearTokens: () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(REMEMBER_ME_KEY);
  },

  /**
   * Check if tokens exist
   * @returns {boolean} True if tokens exist
   */
  hasTokens: () => {
    return tokenStorage.getTokens() !== null;
  }
};
