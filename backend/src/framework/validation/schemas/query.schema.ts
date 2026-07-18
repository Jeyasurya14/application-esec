import { z } from 'zod';

export const QuerySchema = z.object({
  sql: z
    .string()
    .min(1, 'SQL must not be empty')
    .refine((s) => {
      const trimmed = s.trim().toLowerCase();
      return trimmed.startsWith('select') || trimmed.startsWith('call');
    }, 'Only SELECT or CALL statements are allowed'),
});
