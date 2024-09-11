import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductController } from './controllers/product.controller';
import { ProductService } from './service/product.service';

import { DatabaseModule } from './database/database.module';

import CONFIG from './config';

@Module({
  imports: [ConfigModule.forRoot({ load: [CONFIG] }), DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
