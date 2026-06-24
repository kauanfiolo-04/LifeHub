export type GlobalConfig = {
  database: {
    type: 'postgres';
    url: string;
    autoLoadEntities: boolean;
    synchronize: boolean;
  };

  environment: string;

  jwt: {
    jwt_access_secret: string;
    jwt_refresh_secret: string;
    jwt_ttl: number;
    jwt_refresh_ttl: number;
  };
};
