import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationRequest } from 'src/dtos/common.dto';
import { CreateProductRequest } from 'src/dtos/product.dto';
import { ProductService } from 'src/service/product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(
    @Body() createProductRequest: CreateProductRequest,
  ): Promise<string> {
    const result = await this.productService.create({
      id: createProductRequest.id,
      categoryId: createProductRequest.category_id,
      categoryName: createProductRequest.category_name,
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

    if (!result.success) {
      return result.error;
    }

    return 'Success';
  }

  @Get()
  async getAll(@Query() query: PaginationRequest): Promise<string> {
    const result = await this.productService.getAll(query);

    if (!result.success) {
      return result.error;
    }

    return `This action returns all product ${JSON.stringify(result.products)}`;
  }

  @Get(':id')
  async getById(@Param() params: { id: string }): Promise<string> {
    const result = await this.productService.getById(parseInt(params.id, 10));

    if (!result.success) {
      return result.error;
    }

    return `This action returns specific product ${JSON.stringify(result.product)}`;
  }
}
