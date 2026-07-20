import { z } from 'zod';

const callRegex = /^CALL\s+[a-zA-Z_][a-zA-Z0-9_.]*(?:\s*\(.*\))?\s*;?\s*$/i;

export const ProcedureSchema = z.object({
  sql: z
    .string()
    .min(1, 'SQL must not be empty')
    .max(10000, 'SQL too long')
    .refine((s) => callRegex.test(s.trim()), 'Only CALL statements are allowed'),
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
