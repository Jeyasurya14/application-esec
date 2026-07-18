import { NextFunction, Request, Response } from 'express';
import { ScreenService } from '../service/screen.service';
import { ResponseBuilder } from '../../../framework/response';
import { ScreenParams } from '../model/screen-params.model';

export class ScreenController {
  private readonly service: ScreenService;

  constructor(service: ScreenService) {
    this.service = service;
  }

  load = async (req: Request<ScreenParams>, res: Response, next: NextFunction) => {
    try {
      const { module, screen } = req.params;

      const result = await this.service.load(module, screen);
      return ResponseBuilder.success(res, result);
    } catch (error) {
      next(error);
    }
  };
}
