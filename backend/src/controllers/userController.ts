import { Response } from 'express';
import {
  getCurrentUser,
  updateUser,
  deleteUser,
} from '../services/userService';
import { updateUserSchema } from '../schemas';
import { AuthenticatedRequest } from '../middleware/auth';

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await getCurrentUser(req.user!.id);

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const result = await updateUser(req.user!.id, validatedData);

    res.json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export const deleteMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const result = await deleteUser(req.user!.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
