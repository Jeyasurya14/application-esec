import { Router } from 'express';
import { Container, TOKENS } from '../../../framework/di';
import { ScreenController } from '../controller/screen.controller';

const router = Router();
const controller = Container.getInstance().resolve<ScreenController>(TOKENS.SCREEN_CONTROLLER);

router.get('/screen/:module/:screen', controller.load);

export default router;
