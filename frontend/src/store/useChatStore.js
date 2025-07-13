import { create } from 'zustand';
import toast from 'react-hot-toast';
import { axiosInstance } from '../services/api.js';
import { useAuthStore } from './useAuthStore.js';

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  onlineUsers: [],

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get('/messages/users');
      set({ users: response.data.data });
    } catch (error) {
      console.error('Failed to load users:', error);
      toast.error('Failed to load users');
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data.data });
    } catch (error) {
      console.error('Failed to load messages:', error);
      toast.error('Failed to load messages');
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (message) => {
    const { selectedUser, messages } = get();

    if (!selectedUser?._id) {
      toast.error('No user selected');
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/messages/${selectedUser._id}`,
        {
          message
        }
      );
      set({ messages: [...messages, response.data.data] });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser?._id) return;
    const socket = useAuthStore.getState().socket;
    socket.on('newMessage', (message) => {
      if (message.senderId !== selectedUser._id) return;
      set({
        messages: [...get().messages, message]
      });
      toast.success('New message received');
    });
  },
  //
  unSubscribedFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newMessage');
  },

  setSelectedUser: (user) => {
    set({ selectedUser: user });
  }
}));
