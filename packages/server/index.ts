import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import { chatController } from './controller/chat.controller';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
   res.send('aloha from server');
});

app.get('/api/hello', (_req: Request, res: Response) => {
   res.json({ message: 'Hello, world!' });
});

app.post('/api/chat', chatController.sendMessage);

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
