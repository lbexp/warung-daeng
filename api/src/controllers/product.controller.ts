import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ERROR_CODE } from 'src/constants';

import { MetaResponse, Pagination } from 'src/dtos/common.dto';
import {
  CreateProductRequest,
  GetAllProductsResponse,
  GetProductResponse,
} from 'src/dtos/product.dto';
import { ProductService } from 'src/service/product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

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
      switch (result.errorCode) {
        case ERROR_CODE[400]:
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        case ERROR_CODE[404]:
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        default:
          throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }

    return {
      message: 'Success',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  async getAll(
    @Query() query: Pagination,
  ): Promise<MetaResponse<GetAllProductsResponse>> {
    const result = await this.productService.getAll(query);

    if (!result.success) {
      switch (result.errorCode) {
        case ERROR_CODE[400]:
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        case ERROR_CODE[404]:
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        default:
          throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }

    return {
      message: 'Success',
      statusCode: HttpStatus.OK,
      data: {
        limit: query.limit,
        page: query.page,
        data: result.products,
      },
    };
  }

  @Get(':id')
  async getById(
    @Param() params: { id: string },
  ): Promise<MetaResponse<GetProductResponse>> {
    const result = await this.productService.getById(parseInt(params.id, 10));

    if (!result.success) {
      switch (result.errorCode) {
        case ERROR_CODE[400]:
          throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        case ERROR_CODE[404]:
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        default:
          throw new HttpException(
            'Internal server error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }

    return {
      message: 'Success',
      statusCode: HttpStatus.OK,
      data: result.product,
    };
  }
}
