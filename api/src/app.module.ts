import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './modules/database.module';
import { GlobalJwtModule } from './modules/global-jwt.module';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { ProductModule } from './modules/product.module';

import CONFIG from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [CONFIG], isGlobal: true }),
    GlobalJwtModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    ProductModule,
  ],
})
export class AppModule {}
