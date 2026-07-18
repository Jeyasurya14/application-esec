import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT),

  mysql: {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },

  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
    maxRequests: Number(process.env.RATE_LIMIT_MAX) || 60,
  },
};
