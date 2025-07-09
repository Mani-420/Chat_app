import { create } from 'zustand';
import { axiosInstance } from '../services/api.js';

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/users/check');
      set({
        authUser: response.data.user
      });
    } catch (error) {
      console.error('Error checking authentication:', error);
      set({
        authUser: null
      });
    } finally {
      set({
        isCheckingAuth: false
      });
    }
  },

  signup: async (userData) => {}
}));
