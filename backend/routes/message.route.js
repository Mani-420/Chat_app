import { Router } from 'express';
import {
  getAllUsers,
  getMessages,
  sendMessage
} from '../controllers/message.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Protected routes
router.route('/users').get(verifyJWT, getAllUsers);
router.route('/:id').get(verifyJWT, getMessages);
router.route('/send/:id').post(verifyJWT, sendMessage);

export default router;
