import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  updateProfile,
  getCurrentUser
} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Public routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// Protected routes
router.route('/update-profile').put(verifyJWT, updateProfile);
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/me').get(verifyJWT, getCurrentUser);

export default router;
