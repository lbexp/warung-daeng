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

  async getAll(
    pagination: PaginationRequest,
  ): Promise<{ success: boolean; products: Product[]; error: string }> {
    try {
      const resultProducts = await this.conn.query(
        'SELECT p.id, p.category_id, c.name AS category_name, p.sku, p.name, p.description, p.weight, p.width, p.length, p.height, p.image, p.price FROM products p LEFT JOIN categories c ON p.category_id = c.id LIMIT $1 OFFSET $2',
        [pagination.limit, pagination.limit * (pagination.page - 1)],
      );

      if (resultProducts.rowCount === 0) {
        throw 'Error not found';
      }

      const products = resultProducts.rows.map<Product>((rawProduct) => ({
        id: rawProduct.id,
        categoryId: rawProduct.category_id,
        categoryName: rawProduct.category_name,
        description: rawProduct.description,
        height: rawProduct.height,
        image: rawProduct.image,
        length: rawProduct.length,
        name: rawProduct.name,
        price: rawProduct.price,
        sku: rawProduct.sku,
        weight: rawProduct.weight,
        width: rawProduct.width,
      }));

      return {
        success: true,
        products,
        error: '',
      };
    } catch (error) {
      return {
        success: false,
        products: [],
        error: error.message || '',
      };
    }
  }

  async getById(
    id: number,
  ): Promise<{ success: boolean; product: Product | null; error: string }> {
    try {
      const resultProduct = await this.conn.query(
        `SELECT p.id, p.category_id, c.name AS category_name, p.sku, p.name, p.description, p.weight, p.width, p.length, p.height, p.image, p.price FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1`,
        [id],
      );

      if (resultProduct.rowCount === 0) {
        throw 'Error not found';
      }

      return {
        success: true,
        product: {
          id: resultProduct.rows[0].id,
          categoryId: resultProduct.rows[0].category_id,
          categoryName: resultProduct.rows[0].category_name,
          description: resultProduct.rows[0].description,
          height: resultProduct.rows[0].height,
          image: resultProduct.rows[0].image,
          length: resultProduct.rows[0].length,
          name: resultProduct.rows[0].name,
          price: resultProduct.rows[0].price,
          sku: resultProduct.rows[0].sku,
          weight: resultProduct.rows[0].weight,
          width: resultProduct.rows[0].width,
        },
        error: '',
      };
    } catch (error) {
      return {
        success: false,
        product: null,
        error: error.message || '',
      };
    }
  }
}
