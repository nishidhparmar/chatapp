import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from './constant';
import { setCookie, deleteCookie } from './cookie-utils';
import { handleApiError } from './error-handler';

const axiosInstance = axios.create({
  baseURL: API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  config => {
    // Get token from localStorage
    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor with refresh token logic
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        // No refresh token, clear everything and redirect
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
        deleteCookie('access_token');

        if (
          typeof window !== 'undefined' &&
          !window.location.pathname.startsWith('/login')
        ) {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      try {
        // Call refresh token endpoint
        const { data } = await axios.post(`${API_URL}/api/v1/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const newAccessToken = data.data.access_token;
        const newRefreshToken = data.data.refresh_token;

        // Update tokens in localStorage
        localStorage.setItem('access_token', newAccessToken);
        localStorage.setItem('refresh_token', newRefreshToken);
        localStorage.setItem('expires_in', data.data.expires_in.toString());

        // Update cookie for middleware
        setCookie('access_token', newAccessToken, data.data.expires_in);

        // Update authorization header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Process queued requests
        processQueue(null, newAccessToken);

        isRefreshing = false;

        // Retry original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        processQueue(refreshError as AxiosError, null);
        isRefreshing = false;

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_in');
        deleteCookie('access_token');

        if (
          typeof window !== 'undefined' &&
          !window.location.pathname.startsWith('/login')
        ) {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle API errors globally (except 401 which is handled above)
    if (error.response?.status !== 401) {
      handleApiError(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
