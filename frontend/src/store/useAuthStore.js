import { create } from 'zustand';
import { axiosInstance } from '../services/api.js';
import toast from 'react-hot-toast';

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
        authUser: response.data.data // Change from response.data.user to response.data.data
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

  signup: async (userData) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post('/users/register', userData);
      set({ authUser: response.data.data }); // Change from response.data.user to response.data.data
      toast.success('Account created successfully!');
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error(error.response?.data?.message || 'Failed to create account.');
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (userData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post('/users/login', userData);
      set({ authUser: response.data.data });
      toast.success('Logged in successfully!');
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error(error.response?.data?.message || 'Failed to log in.');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/users/logout');
      set({ authUser: null });
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out.');
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  updateProfile: async (userData) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put(
        '/users/update-profile',
        userData
      );
      set({ authUser: response.data.data });
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile.');
    } finally {
      set({ isUpdatingProfile: false });
    }
  }
}));
