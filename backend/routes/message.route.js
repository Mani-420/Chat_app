import { Router } from 'express';
import {
  getAllUsers,
  getMessages,
  sendMessage
} from '../controllers/message.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/users').get(verifyJWT, getAllUsers); // Protected route
router.route('/:id').get(verifyJWT, getMessages); // Protected route
router.route('/send/:id').post(verifyJWT, sendMessage); // Protected route

export default router;
