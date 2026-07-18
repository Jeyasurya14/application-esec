import { NextFunction, Request, Response } from 'express';
import { QueryModuleService } from '../service/query.service';
import { QueryDto } from '../model';
import { ResponseBuilder } from '../../../framework/response';

export class QueryController {
  private readonly service: QueryModuleService;

  constructor(service: QueryModuleService) {
    this.service = service;
  }

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: QueryDto = req.body;
      const rows = await this.service.execute(dto.sql);
      console.log('Module/query controller',rows)
      return ResponseBuilder.success(res, rows);
    } catch (error) {
      next(error);
    }
  };
}
