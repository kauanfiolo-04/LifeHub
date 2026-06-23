import { registerAs } from '@nestjs/config';

export default registerAs('globalConfig', () => ({
  database: {
    type: process.env.DATABASE_TYPE as 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: Boolean(process.env.DATABASE_AUTO_LOAD_ENTITIES || true),
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE)
  },
  environment: process.env.NODE_ENV || 'development'
}));
