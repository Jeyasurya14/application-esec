import { z } from 'zod';

export const UpdateSchema = z.object({
  sql: z
    .string()
    .min(1, 'SQL must not be empty')
    .refine((s) => {
      const trimmed = s.trim().toLowerCase();
      return (
        trimmed.startsWith('call') ||
        trimmed.startsWith('insert') ||
        trimmed.startsWith('update') ||
        trimmed.startsWith('delete')
      );
    }, 'Only CALL, INSERT, UPDATE, or DELETE statements are allowed'),
});
