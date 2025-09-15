import { z } from 'zod';
import { loginSchema, registerSchema, updateUserSchema } from './schemas';

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
