import { create } from 'zustand';
import { axiosInstance } from '../services/api.js';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = 'http://localhost:8080';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get('/users/check');
      set({
        authUser: response.data.data
      });
      get().connectSocket();
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
      get().connectSocket();
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
      get().connectSocket();
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
      get().disconnectSocket();
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
  },

  // Socket connection logic
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) {
      return; // Don't connect if not authenticated
    }
    const socket = io(BASE_URL, {
      query: { userId: authUser._id }
    });
    socket.connect();
    set({ socket: socket });
    socket.on('getAllOnlineUsers', (usersIds) => {
      set({ onlineUsers: usersIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  }
}));
