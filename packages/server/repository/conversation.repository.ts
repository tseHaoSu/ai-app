export type Message = { role: 'user' | 'assistant'; content: string };

class ConversationRepository {
   private conversations = new Map<string, Message[]>();

   getHistory(conversationId: string): Message[] {
      return this.conversations.get(conversationId) || [];
   }

   saveHistory(conversationId: string, history: Message[]): void {
      this.conversations.set(conversationId, history);
   }
}

export const conversationRepository = new ConversationRepository();
