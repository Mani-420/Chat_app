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
  aiMessages: [],
  isAiLoading: false,
  isAiChatSelected: false,

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

    console.log('Store received from MessageInput:', message); // Add this
    console.log(
      'Image data length:',
      message.image ? message.image.length : 'No image'
    );

    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        message
      );
      set({ messages: [...messages, response.data.data] });
      toast.success('Message sent successfully');
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  },

  selectAiChat: () => {
    set({ selectedUser: null, messages: [], isAiChatSelected: true });
  },

  sendMessageToAi: async (message) => {
    const { aiMessages } = get();
    set({ isAiLoading: true });

    try {
      const response = await axiosInstance.post('/ai/chat', {
        message: message.text
      });
      const messagesArray =
        response.data.data.messages || response.data.data || [];
      set({
        aiMessages: messagesArray,
        isAiLoading: false
      });
    } catch (error) {
      console.error('Failed to get AI response:', error);
      toast.error('Failed to get AI response');
      set({ aiMessages: aiMessages, isAiLoading: false });
    }
  },

  getAiConversation: async () => {
    set({ isAiLoading: true });
    try {
      const response = await axiosInstance.get('/ai/conversation');
      const messagesArray = response.data.data.messages || [];
      set({ aiMessages: messagesArray, isAiLoading: false });
    } catch (error) {
      console.error('Failed to load AI conversation:', error);
      toast.error('Failed to load AI conversation');
      set({ isAiLoading: false });
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
    set({ selectedUser: user, isAiChatSelected: false });
  }
}));
