import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    
    // Automatically fix broken sessions from previous bug
    if (token === 'undefined' || token === 'null') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
      return Promise.reject(new Error('Sesi tidak valid, silakan login kembali.'));
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh or 401s
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const res = await axios.post('http://localhost:3000/api/v1/auth/refresh', {
          refresh_token: refreshToken
        });

        if (res.data.success) {
          const newAccessToken = res.data.data.access_token || res.data.data.accessToken;
          localStorage.setItem('access_token', newAccessToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          if (originalRequest.headers.set) {
            originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
          } else {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          }
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, clear local storage and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
