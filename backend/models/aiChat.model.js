import mongoose, { Schema } from 'mongoose';

const aiChatSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    conversationId: {
      type: String,
      required: true,
      unique: true
    },

    messages: [
      {
        role: {
          type: String,
          enum: ['user', 'assistant'],
          required: true
        },
        content: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    title: {
      type: String,
      default: 'AI Chat'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

const AIChat = mongoose.model('AIChat', aiChatSchema);
export default AIChat;
