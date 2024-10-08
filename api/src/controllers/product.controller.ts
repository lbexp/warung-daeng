import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { MetaResponse, PaginationRequest } from 'src/dtos/common.dto';
import {
  CreateProductRequest,
  GetAllProductsResponse,
  GetProductResponse,
} from 'src/dtos/product.dto';

import { AuthGuard } from 'src/guards/auth.guard';
import { ProductService } from 'src/service/product.service';

import generateHttpException from 'src/helpers/generateHttpException';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createProductRequest: CreateProductRequest,
  ): Promise<MetaResponse> {
    const result = await this.productService.create({
      id: createProductRequest.id,
      categoryId: createProductRequest.categoryId,
      categoryName: createProductRequest.categoryName,
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
      throw generateHttpException(result.errorCode);
    }

    return {
      message: 'Success',
      statusCode: HttpStatus.CREATED,
    };
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll(
    @Query() query: PaginationRequest,
  ): Promise<MetaResponse<GetAllProductsResponse>> {
    const result = await this.productService.getAll({
      limit: parseInt(query.limit || '0', 10),
      page: parseInt(query.page || '0', 10),
      search: query.search,
    });

    if (!result.success) {
      throw generateHttpException(result.errorCode);
    }

    return {
      message: 'Success',
      statusCode: HttpStatus.OK,
      data: {
        limit: result.pagination.limit,
        page: result.pagination.page,
        data: result.products,
      },
    };
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(
    @Param() params: { id: string },
  ): Promise<MetaResponse<GetProductResponse>> {
    const result = await this.productService.getById(parseInt(params.id, 10));

    if (!result.success) {
      throw generateHttpException(result.errorCode);
    }

    return {
      message: 'Success',
      statusCode: HttpStatus.OK,
      data: result.product,
    };
  }
}
