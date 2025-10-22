import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { z } from 'zod';

dotenv.config();

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send('aloha from server');
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello, world!' });
});

//create a db for storing chat history later
type Message = { role: 'user' | 'assistant'; content: string };
const conversations = new Map<string, Message[]>();

const chatSchema = z.object({
   prompt: z
      .string()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt is too long'),
   conversationId: z.string().uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
   try {
      // Validate request body with Zod
      const validation = chatSchema.safeParse(req.body);

      if (!validation.success) {
         return res.status(400).json({
            error: 'Invalid request',
            details: validation.error.errors,
         });
      }

      const { prompt, conversationId } = validation.data;

      let history = conversations.get(conversationId) || [];
      history.push({ role: 'user', content: prompt });

      const response = await client.chat.completions.create({
         model: 'gpt-4o-mini',
         messages: history,
         temperature: 0.2,
         max_tokens: 100,
      });

      const aiResponse = response.choices[0]?.message?.content || 'No response';
      history.push({ role: 'assistant', content: aiResponse });

      conversations.set(conversationId, history);
      res.json({ message: aiResponse });
   } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error communicating with OpenAI' });
   }
});

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
