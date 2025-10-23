import OpenAI from 'openai';
import { conversationRepository } from '../repository/conversation.repository';

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

type ChatResponse = {
   id: string;
   message: string;
};

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      // Get history
      let history = conversationRepository.getHistory(conversationId);
      history.push({ role: 'user', content: prompt });

      // Call OpenAI API
      const response = await client.chat.completions.create({
         model: 'gpt-4o-mini',
         messages: history,
         temperature: 0.2,
         max_tokens: 100,
      });

      const aiResponse = response.choices[0]?.message?.content || 'No response';
      history.push({ role: 'assistant', content: aiResponse });

      // Save history to repository
      conversationRepository.saveHistory(conversationId, history);

      return {
         id: response.id,
         message: aiResponse,
      };
   },
};
