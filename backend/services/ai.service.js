import { GoogleGenerativeAI } from '@google/generative-ai';

const googleAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  async generateResponse(messages, options = {}) {
    try {
      const model = googleAI.getGenerativeModel({
        model: options.model || 'gemini-1.5-flash'
      });

      const conversation = this.formatMessagesForGemini(messages);
      const result = await model.generateContent(conversation);

      const response = result.response;

      return response.text() || 'No response from AI';
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "Hello! I'm currently experiencing high traffic. Please try again later.";
    }
  }

  formatMessages(messages) {
    return messages.map((msg) => ({
      role: msg.role,
      content: msg.content
    }));
  }

  formatMessagesForGemini(messages) {
    // Convert to conversation string for Gemini
    return (
      messages
        .map(
          (msg) =>
            `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        )
        .join('\n') + '\nAssistant:'
    );
  }
}

export default new AIService();
