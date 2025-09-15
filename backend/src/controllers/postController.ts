import { Request, Response } from 'express';
import { getAllPosts, getPostById, createPost } from '../services/postService';
import { createPostSchema } from '../schemas';
import { AuthenticatedRequest } from '../middleware/auth';

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createNewPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const validatedData = createPostSchema.parse(req.body);
    const result = await createPost({
      ...validatedData,
      authorId: req.user!.id,
    });
    
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
