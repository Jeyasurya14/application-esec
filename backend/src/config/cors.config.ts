import { CorsOptions } from 'cors';

export const CORS_CONFIG: CorsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
} as const;
