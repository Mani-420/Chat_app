import { X, Bot, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

const ChattingHeader = () => {
  const { selectedUser, setSelectedUser, isAiChatSelected } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();

  if (isAiChatSelected) {
    return (
      <header className="border-b border-base-300 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>

          <div>
            <h3 className="font-medium">AI Assistant</h3>
            <p className="text-sm text-base-content/70">
              🤖 Always online • Powered by Google Gemini
            </p>
          </div>
        </div>
      </header>
    );
  }

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || '/avatar.png'}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChattingHeader;
