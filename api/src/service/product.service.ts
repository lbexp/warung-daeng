import { Injectable } from '@nestjs/common';
import { PaginationRequest } from 'src/dtos/common.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductService {
  private readonly products: Product[] = [];

  create(product: Product) {
    this.products.push(product);
  }

  getAll(pagination: PaginationRequest): Product[] {
    console.log(pagination); //TODO: create the usage of this pagination
    return this.products;
  }

  getById(id: number): Product {
    return this.products.find((product) => product.id === id);
  }
}
