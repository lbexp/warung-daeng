import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductController } from './controllers/product.controller';
import { ProductService } from './service/product.service';

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
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
