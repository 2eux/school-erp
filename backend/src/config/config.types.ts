import type { AppConfig } from './app.config';
import type { DbConfig } from './database.config';
import type { JwtConfig } from './jwt.config';

/** Combined shape of all registered namespaces (matches `configLoaders`). */
export interface RootConfig {
  app: AppConfig;
  db: DbConfig;
  jwt: JwtConfig;
}

export type { AppConfig, DbConfig, JwtConfig };
