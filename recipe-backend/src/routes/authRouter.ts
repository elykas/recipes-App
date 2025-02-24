import express from 'express';
import { googleAuth, googleAuthCallback, loginUser, logout, registerUser } from '../controllers/authController';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logout', logout);  
router.get('/google', googleAuth);
router.get('/google/callback', googleAuthCallback);


export default router;