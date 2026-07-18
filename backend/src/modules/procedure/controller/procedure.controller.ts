import { ProcedureModuleService } from '../service/procedure.service';
import { Request, Response, NextFunction } from 'express';
import { ProcedureDto } from '../model';
import { ResponseBuilder } from '../../../framework/response/builder/response.builder';
export class ProcedureController {
  private readonly service: ProcedureModuleService;

  constructor(service: ProcedureModuleService) {
    this.service = service;
  }

  execute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: ProcedureDto = req.body;
      const rows = await this.service.execute(dto.sql);
      return ResponseBuilder.success(res, rows);
    } catch (error) {
      next(error);
    }
  };
}
