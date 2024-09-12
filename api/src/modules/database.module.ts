import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Pool } from 'pg';

import { DB_CONNECTION } from 'src/constants';

const dbProvider = {
  provide: DB_CONNECTION,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return new Pool({
      user: config.get('database.username'),
      host: config.get('database.host'),
      database: config.get('database.name'),
      password: config.get('database.password'),
      port: config.get('database.port'),
    });
  },
};
@Global()
@Module({
  imports: [ConfigModule],
  providers: [dbProvider],
  exports: [dbProvider],
})
export class DatabaseModule {}
