import express, { type Request, type Response } from 'express';
import { chatController } from './controller/chat.controller';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
   res.send('aloha from server');
});

router.post('/api/chat', chatController.sendMessage);

export default router;
