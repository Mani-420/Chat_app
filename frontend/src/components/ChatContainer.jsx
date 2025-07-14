import { useChatStore } from '../store/useChatStore';
import { useEffect, useRef } from 'react';

import ChattingHeader from './ChattingHeader';
import MessageInput from './MessageInput';
import MessageTemplate from './templates/MessageTemplate';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../constants/date.js';

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unSubscribedFromMessages,
    isAiChatSelected,
    aiMessages,
    isAiLoading,
    getAiConversation
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (isAiChatSelected) {
      getAiConversation();
    } else if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => unSubscribedFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unSubscribedFromMessages,
    isAiChatSelected,
    getAiConversation
  ]);

  const displayMessages = isAiChatSelected ? aiMessages : messages;
  const isLoading = isAiChatSelected ? isAiLoading : isMessagesLoading;

  useEffect(() => {
    if (messageEndRef.current && displayMessages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChattingHeader />
        <MessageTemplate />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChattingHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <MessageTemplate />
        ) : (
          displayMessages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                isAiChatSelected
                  ? message.role === 'user'
                    ? 'chat-end'
                    : 'chat-start'
                  : message.senderId === authUser._id
                  ? 'chat-end'
                  : 'chat-start'
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="avatar"
                    src={
                      isAiChatSelected
                        ? message.role === 'user'
                          ? authUser.profilePic || '/avatar.png'
                          : '/ai-avatar.png' // You can add an AI avatar
                        : message.senderId === authUser._id
                        ? authUser.profilePic || '/avatar.png'
                        : selectedUser.profilePic || '/avatar.png'
                    }
                  />
                </div>
              </div>

              <div className="chat-bubble">
                {isAiChatSelected ? message.content : message.text}
              </div>

              <div className="chat-footer opacity-50 text-xs">
                {formatMessageTime(message.createdAt)}
              </div>
            </div>
          ))
        )}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
