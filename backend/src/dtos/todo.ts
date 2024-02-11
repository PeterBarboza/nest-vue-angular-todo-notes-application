import { z } from 'zod';

export const createTodoSchema = z.object({
  content: z.string(),
  userId: z.string().uuid(),
});

export const updateTodoSchema = z.object({
  content: z.string(),
  userId: z.string().uuid(),
});
