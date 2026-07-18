import { NextFunction, Request, Response } from 'express';
import { UpdateModuleService } from '../service';
import { UpdateDto } from '../model';
import { ResponseBuilder } from '../../../framework/response';

export class UpdateController {
  private readonly service: UpdateModuleService;

  constructor(service: UpdateModuleService) {
    this.service = service;
  }

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: UpdateDto = req.body;
      const result = await this.service.execute(dto.sql);
      return ResponseBuilder.success(res, result);
    } catch (error) {
      next(error);
    }
  };
}
