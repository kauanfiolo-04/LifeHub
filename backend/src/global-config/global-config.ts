import { registerAs } from '@nestjs/config';
import { GlobalConfig } from './global-config.type';

export default registerAs(
  'globalConfig',
  (): GlobalConfig => ({
    database: {
      type: process.env.DATABASE_TYPE as 'postgres',
      url: process.env.DATABASE_URL ?? '',
      autoLoadEntities: Boolean(process.env.DATABASE_AUTO_LOAD_ENTITIES || true),
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE)
    },
    environment: process.env.NODE_ENV || 'development',
    frontend_url: process.env.FRONTEND_URL || 'http://localhost:3000',
    jwt: {
      jwt_access_secret: process.env.JWT_ACCESS_SECRET ?? '',
      jwt_refresh_secret: process.env.JWT_REFRESH_SECRET ?? '',
      jwt_ttl: Number(process.env.JWT_TTL ?? 3600),
      jwt_refresh_ttl: Number(process.env.JWT_REFRESH_TTL ?? 86400)
    },
    oauth: {
      google_client_id: process.env.GOOGLE_CLIENT_ID ?? '',
      google_secret: process.env.GOOGLE_SECRET ?? '',
      google_callback_url: process.env.GOOGLE_CALLBACK_URL!,
      github_client_id: process.env.GITHUB_CLIENT_ID ?? '',
      github_client_secret: process.env.GITHUB_CLIENT_SECRET ?? '',
      github_callback_url: process.env.GITHUB_CALLBACK_URL!
    }
  })
);
