import express from 'express';
import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { updateUserSchema } from '../schemas';

const router = express.Router();
const prisma = new PrismaClient();

// GET /users/me - Get current user info
router.get(
  '/me',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { posts: true },
        },
      },
    });

    res.json(user);
  })
);

// PUT /users/me - Update user info
router.put(
  '/me',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const validatedData = updateUserSchema.parse(req.body);

    const updateData: any = {};

    if (validatedData.name) updateData.name = validatedData.name;
    if (validatedData.email) updateData.email = validatedData.email;
    if (validatedData.password) {
      updateData.password = await bcrypt.hash(validatedData.password, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user!.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
      },
    });

    res.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  })
);

// DELETE /users/me - Delete user account
router.delete(
  '/me',
  authenticateToken,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    await prisma.user.delete({
      where: { id: req.user!.id },
    });

    res.json({
      message: 'Account deleted successfully',
    });
  })
);

export default router;
