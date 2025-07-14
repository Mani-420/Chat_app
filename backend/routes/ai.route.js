import { Router } from 'express';
import {
  sendMessageToAI,
  getAIConversation
} from '../controllers/ai.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/chat', verifyJWT, sendMessageToAI);
router.get('/conversation', verifyJWT, getAIConversation);

export default router;
