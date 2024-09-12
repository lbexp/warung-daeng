import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductModule } from './modules/product.module';
import { DatabaseModule } from './modules/database.module';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';

import CONFIG from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [CONFIG] }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ProductModule,
  ],
})
export class AppModule {}
