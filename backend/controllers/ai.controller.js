import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import AiChat from '../models/aiChat.model.js';
import AIService from '../services/ai.service.js';
import { v4 as uuidv4 } from 'uuid';

const sendMessageToAI = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { message } = req.body;

  if (!message.trim()) {
    throw new ApiError('Message is required', 400);
  }

  try {
    let aiChat = await AiChat.findOne({ userId, isActive: true });
    if (!aiChat) {
      aiChat = new AiChat({
        userId,
        messages: [],
        conversationId: uuidv4(),
        isActive: true
      });
    }
    aiChat.messages.push({ role: 'user', content: message.trim() });

    const formattedMessages = AIService.formatMessages(aiChat.messages);
    const aiResponse = await AIService.generateResponse(formattedMessages);
    aiChat.messages.push({ role: 'assistant', content: aiResponse });

    await aiChat.save();

    res
      .status(200)
      .json(new ApiResponse(200, aiChat.messages, 'Message sent successfully'));
  } catch (error) {
    console.error('Error sending message to AI:', error);
    throw new ApiError('Failed to send message to AI', 500);
  }
});

const getAIConversation = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const aiChat = await AiChat.findOne({ userId, isActive: true });

  if (!aiChat) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { messages: [] },
          'No active AI conversation found'
        )
      );
  }

  res
    .status(200)
    .json(new ApiResponse(200, aiChat.messages, 'AI conversation retrieved'));
});

export { sendMessageToAI, getAIConversation };
