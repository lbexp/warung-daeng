import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationRequest } from 'src/dtos/common.dto';
import { CreateProductRequest } from 'src/dtos/product.dto';
import { ProductService } from 'src/service/product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() createProductRequest: CreateProductRequest): string {
    this.productService.create({
      id: createProductRequest.id,
      categoryId: createProductRequest.category_id,
      description: createProductRequest.description,
      height: createProductRequest.height,
      image: createProductRequest.image,
      length: createProductRequest.length,
      name: createProductRequest.name,
      price: createProductRequest.price,
      sku: createProductRequest.sku,
      weight: createProductRequest.weight,
      width: createProductRequest.width,
    });
    return `This action create new product ${createProductRequest}`;
  }

  @Get()
  getAll(@Query() query: PaginationRequest): string {
    const products = this.productService.getAll(query);

    return `This action returns all product ${JSON.stringify(products)}`;
  }

  @Get(':id')
  getById(@Param() params: { id: string }): string {
    const product = this.productService.getById(parseInt(params.id, 10));

    return `This action returns specific product ${JSON.stringify(product)}`;
  }
}
