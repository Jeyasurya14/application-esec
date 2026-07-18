import './container.config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes/index';
import { APP_CONFIG, CORS_CONFIG } from './config';
import {
  requestIdMiddleware,
  requestLoggerMiddleware,
  apiRateLimiter,
} from './framework/middleware';
import { exceptionMiddleware } from './framework/exceptions/middleware/exception.middleware';

const app = express();

app.use(requestIdMiddleware);
app.use(helmet());
app.use(cors(CORS_CONFIG));
app.use(compression());
app.use(requestLoggerMiddleware);
app.use(apiRateLimiter);
app.use(express.json({ limit: APP_CONFIG.maxBodySize }));
app.use(routes);
app.use(exceptionMiddleware);

export default app;
