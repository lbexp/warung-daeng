import { Module } from '@nestjs/common';

import { ProductController } from 'src/controllers/product.controller';
import { ProductService } from 'src/service/product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
