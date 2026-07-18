import { Router } from 'express';
import procedureRoute from '../modules/procedure';
import queryRoutes from '../modules/query';
import updateRoutes from '../modules/update';
import screenRoutes from '../modules/screen/routes/screen.route';
const router = Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend Running',
  });
});
router.use(procedureRoute);

router.use(queryRoutes);

router.use(updateRoutes);

router.use(screenRoutes);

export default router;
