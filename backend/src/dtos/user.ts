import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const updateUserSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
});
