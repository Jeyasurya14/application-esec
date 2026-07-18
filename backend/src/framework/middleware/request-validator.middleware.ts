import { Request, Response, NextFunction } from 'express';
// import { ZodSchema } from 'zod';
import { ZodType } from 'zod';
import { ResponseBuilder } from '../response';

export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      next();
    } catch (error: unknown) {
      const zodError = error as { issues?: Array<{ message: string }>; message?: string } | null;
      if (zodError?.issues) {
        const messages = zodError.issues.map((e) => e.message).join('; ');
        ResponseBuilder.error(res, messages, 400);
        return;
      }
      next(error);
    }
  };
}
