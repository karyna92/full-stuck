import { refreshTokens } from "../api/userApi";

// Save tokens helper
export const saveTokens = ({ accessToken, refreshToken }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

// Clear tokens helper
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

/**
 * Refresh session: uses refresh token to get new tokens.
 * If fails, calls onLogout callback (usually navigates to login).
 * Returns tokens on success or null on failure.
 */
export async function refreshSession(onLogout) {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    if (onLogout) onLogout();
    return null;
  }

  try {
    const response = await refreshTokens(refreshToken);
    const { tokens } = response.data;
    saveTokens(tokens);
    return tokens;
  } catch (error) {
    if (error.response?.status === 401) {
      clearTokens();
      if (onLogout) onLogout();
      return null;
    }
    throw error;
  }
}
