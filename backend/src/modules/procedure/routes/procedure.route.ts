import { Router } from 'express';
import { Container, TOKENS } from '../../../framework/di';
import { ProcedureController } from '../controller';
import { validateBody } from '../../../framework/middleware';
import { ProcedureSchema } from '../../../framework/validation';

const router = Router();
const controller = Container.getInstance().resolve<ProcedureController>(
  TOKENS.PROCEDURE_CONTROLLER,
);

router.post('/post_view_call', validateBody(ProcedureSchema), controller.execute);

export default router;
