import { Response } from 'express';
import { SuccessResponse, ErrorResponse } from '../models';

export class ResponseBuilder {
  static success<T>(res: Response, data: T) {
    const response: SuccessResponse<T> = {
      status: 'PASS',
      message: data,
    };
    return res.json(response);
  }

  static error(res: Response, message: string, status = 500) {
    const response: ErrorResponse = {
      status: 'FAIL',
      message,
    };
    return res.status(status).json(response);
  }
}
