import { Router } from 'express';
import { Container, TOKENS } from '../../../framework/di';
import { UpdateController } from '../controller/update.controller';
import { validateBody } from '../../../framework/middleware';
import { UpdateSchema } from '../../../framework/validation';

const router = Router();
const controller = Container.getInstance().resolve<UpdateController>(TOKENS.UPDATE_CONTROLLER);

router.post('/post_insert_update', validateBody(UpdateSchema), controller.execute);

export default router;
