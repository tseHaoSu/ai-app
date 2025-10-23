import type { Request, Response } from 'express';
import { z } from 'zod';
import { chatService } from '../services/chat.service';

const chatSchema = z.object({
   prompt: z
      .string()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long'),
   conversationId: z.string().uuid(),
});

export const chatController = {
   async sendMessage(req: Request, res: Response): Promise<void> {
      try {
         const validation = chatSchema.safeParse(req.body);

         if (!validation.success) {
            res.status(400).json({
               error: 'Invalid request',
               details: validation.error.errors,
            });
            return;
         }

         const { prompt, conversationId } = validation.data;

         const aiResponse = await chatService.sendMessage(
            prompt,
            conversationId
         );

         res.json({ message: aiResponse });
      } catch (error) {
         console.error('Error:', error);
         res.status(500).json({ error: 'Error communicating with OpenAI' });
      }
   },
};
