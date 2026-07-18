import { Router } from 'express';
import { Container, TOKENS } from '../../../framework/di';
import { QueryController } from '../controller';
import { validateBody } from '../../../framework/middleware';
import { QuerySchema } from '../../../framework/validation';

const router = Router();
const controller = Container.getInstance().resolve<QueryController>(TOKENS.QUERY_CONTROLLER);

router.post('/post_view_query', validateBody(QuerySchema), controller.execute);

export default router;
