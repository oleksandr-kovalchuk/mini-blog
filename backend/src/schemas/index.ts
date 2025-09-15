import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(3, 'Password is required'),
});

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(1, 'Name must be at least 1 characters').optional(),
    email: z.string().email('Invalid email format').optional(),
    password: z
      .string()
      .min(3, 'Password must be at least 3 characters')
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
