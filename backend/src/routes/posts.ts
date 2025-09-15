import express from 'express';
import asyncHandler from 'express-async-handler';
import { authenticateToken } from '../middleware/auth';
import {
  getPosts,
  getPost,
  createNewPost,
} from '../controllers/postController';

const router = express.Router();

router.get('/', asyncHandler(getPosts));

router.get('/:id', asyncHandler(getPost));

router.post('/', authenticateToken, asyncHandler(createNewPost));

export default router;
