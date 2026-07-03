import { defineStore } from 'pinia';
import authService from '../services/auth.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('access_token')
  }),

  actions: {
    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.login(email, password);
        
        if (response.success && response.data) {
          const accessToken = response.data.access_token || response.data.accessToken;
          const refreshToken = response.data.refresh_token || response.data.refreshToken;
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
          this.user = response.data.user;
          this.isAuthenticated = true;
          return { success: true };
        }
        return { success: false, message: response.message || 'Login failed' };
      } catch (err) {
        this.error = err.response?.data?.message || 'An error occurred during login';
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    async register(userData) {
      this.loading = true;
      this.error = null;
      try {
        const response = await authService.register(userData);
        if (response.success) {
          return { success: true };
        }
        return { success: false, message: response.message || 'Registration failed' };
      } catch (err) {
        this.error = err.response?.data?.message || 'An error occurred during registration';
        return { success: false, message: this.error };
      } finally {
        this.loading = false;
      }
    },

    async fetchProfile() {
      if (!this.isAuthenticated) return;
      this.loading = true;
      try {
        const response = await authService.getProfile();
        if (response.success) {
          this.user = response.data;
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
        // Maybe log out if 401
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await authService.logout();
      } catch (err) {
        console.error('Logout error', err);
      } finally {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.user = null;
        this.isAuthenticated = false;
      }
    }
  }
});
