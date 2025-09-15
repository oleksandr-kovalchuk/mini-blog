import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

export const updateUserSchema = z
  .object({
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email format').optional(),
    password: z
      .string()
      .refine((val) => val === '' || val.length >= 3, {
        message: 'Password must be at least 3 characters',
      })
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) =>
      Object.keys(data).filter((key) => data[key as keyof typeof data] !== '')
        .length > 0,
    {
      message: 'At least one field must be provided',
    }
  )
  .refine(
    (data) => {
      if (data.password && data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }
  );
