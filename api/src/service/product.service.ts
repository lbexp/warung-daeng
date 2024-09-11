import { Inject, Injectable } from '@nestjs/common';

import { Pool, QueryResult } from 'pg';

import { DB_CONNECTION } from 'src/constants';
import { PaginationRequest } from 'src/dtos/common.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@Inject(DB_CONNECTION) private conn: Pool) {}

  async create(product: Product): Promise<{ success: boolean; error: string }> {
    try {
      await this.conn.query('BEGIN');

      let resultCategory: QueryResult;

      if (!product.categoryId) {
        resultCategory = await this.conn.query(
          'INSERT INTO categories(name) VALUES($1) RETURNING *',
          [product.categoryName],
        );

        if (resultCategory.rowCount === 0) {
          throw 'Error';
        }
      }

      const categoryId = resultCategory
        ? resultCategory.rows[0].id
        : product.categoryId;

      const resultProduct = await this.conn.query(
        'INSERT INTO products(category_id, sku, name, description, weight, width, length, height, image, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
        [
          categoryId,
          product.sku,
          product.name,
          product.description,
          product.weight,
          product.width,
          product.length,
          product.height,
          product.image,
          product.price,
        ],
      );

      if (resultProduct.rowCount === 0) {
        throw 'Error';
      }

      await this.conn.query('COMMIT');

      return {
        success: true,
        error: '',
      };
    } catch (error) {
      await this.conn.query('ROLLBACK');

      return {
        success: false,
        error: error.message || '',
      };
    }
  }

  async getAll(pagination: PaginationRequest): Promise<Product[]> {
    console.log(pagination);
    const res = await this.conn.query('SELECT * FROM products');

    return res.rows;
  }

  async getById(id: number): Promise<Product> {
    const result = await this.conn.query(
      `SELECT * FROM products WHERE id === ${id}`,
    );
    return result.rows[0];
  }
}
