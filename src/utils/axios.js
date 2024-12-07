import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import { CONFIG } from 'src/config-global';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem();
        window.location.href = paths.auth.jwt.signIn;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

export async function setSession(accessToken, refreshToken) {
  try {
    if (accessToken) {
      sessionStorage.setItem(STORAGE_KEY, accessToken);
      sessionStorage.setItem(STORAGE_REFRESH_KEY, refreshToken);

      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      const decodedToken = jwtDecode(accessToken);

      if (decodedToken && 'exp' in decodedToken) {
        tokenExpired(decodedToken.exp);
      } else {
        throw new Error('Invalid access token!');
      }
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem('refreshToken');
      delete axiosInstance.defaults.headers.common.Authorization;
    }
  } catch (error) {
    console.error('Error during set session:', error);
    throw error;
  }
}

export const refreshAccessToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const res = await axios.post(endpoints.auth.refresh, { refreshToken });

    const { accessToken, refreshToken: newRefreshToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error('Error during token refresh:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  exchange: {
    connect: '/api/v1/exchange/connect',
    status: '/api/v1/exchange/status',
    disconnect: '/api/v1/exchange/disconnect',
  },
  auth: {
    signIn: '/api/auth/sign-in',
    signUp: '/api/auth/sign-up',
    oAth: '/api/v1/auth/google',
    refresh: '/api/v1/auth/refresh',
  },
  user: {
    me: '/api/v1/account',
    email: '/api/v1/account/email',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};

export const STORAGE_KEY = 'jwt_access_token';
export const STORAGE_REFRESH_KEY = 'jwt_refresh_token';

export function tokenExpired(exp) {
  const currentTime = Date.now();
  const timeLeft = exp * 1000 - currentTime;

  setTimeout(() => {
    try {
      console.log('refresh')
    } catch (error) {
      console.error('Error during token expiration:', error);
      throw error;
    }
  }, timeLeft);
}
