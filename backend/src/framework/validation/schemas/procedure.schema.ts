import { z } from 'zod';

export const ProcedureSchema = z.object({
  sql: z
    .string()
    .min(1, 'SQL must not be empty')
    .refine(
      (s) => s.trim().toLowerCase().startsWith('call'),
      'Only CALL statements (stored procedures) are allowed',
    ),
  context: z
    .object({
      module: z.string().optional(),
      screen: z.string().optional(),
      user: z.string().optional(),
      range: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
    })
    .optional(),
});
