import express from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { createPostSchema } from '../schemas';

const router = express.Router();
const prisma = new PrismaClient();

// GET /posts - Get all posts
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(posts);
  })
);

// GET /posts/:id - Get specific post
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.json(post);
  })
);

// POST /posts - Create new post (authenticated only)
router.post(
  '/',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const validatedData = createPostSchema.parse(req.body);

    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        authorId: req.user!.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  })
);

export default router;
