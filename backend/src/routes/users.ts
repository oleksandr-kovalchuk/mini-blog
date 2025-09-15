import express from 'express';
import asyncHandler from 'express-async-handler';
import { authenticateToken } from '../middleware/auth';
import { getMe, updateMe, deleteMe } from '../controllers/userController';

const router = express.Router();

router.get('/me', authenticateToken, asyncHandler(getMe));

router.put('/me', authenticateToken, asyncHandler(updateMe));

router.delete('/me', authenticateToken, asyncHandler(deleteMe));

export default router;
