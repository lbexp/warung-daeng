import { Inject, Injectable } from '@nestjs/common';

import { Pool, QueryResult } from 'pg';

import { DB_CONNECTION, ERROR_CODE } from 'src/constants';
import { Pagination } from 'src/entities/common.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(@Inject(DB_CONNECTION) private conn: Pool) {}

  async create(
    product: Product,
  ): Promise<{ success: boolean; errorCode: string }> {
    try {
      await this.conn.query('BEGIN');

      let resultCategory: QueryResult;

      if (!product.categoryId) {
        resultCategory = await this.conn.query(
          'INSERT INTO categories(name) VALUES($1) RETURNING *',
          [product.categoryName],
        );

        if (resultCategory.rowCount === 0) {
          throw new Error(ERROR_CODE[500]);
        }
      }

      const categoryId = resultCategory
        ? resultCategory.rows[0].id
        : product.categoryId;

      const resultProduct = await this.conn.query(
        'INSERT INTO products(category_id, sku, name, description, weight, width, length, height, image, price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
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
        throw new Error(ERROR_CODE[500]);
      }

      await this.conn.query('COMMIT');

      return {
        success: true,
        errorCode: '',
      };
    } catch (error) {
      await this.conn.query('ROLLBACK');

      return {
        success: false,
        errorCode: ERROR_CODE[error.message] || ERROR_CODE[500],
      };
    }
  }

  async getAll(pagination: Pagination): Promise<{
    success: boolean;
    pagination: Pagination;
    products: Product[];
    errorCode: string;
  }> {
    const limit = pagination.limit || 20;
    const page = pagination.page || 1;
    const search = pagination.search || '';

    let query =
      'SELECT p.id, p.category_id, c.name AS category_name, p.sku, p.name, p.description, p.weight, p.width, p.length, p.height, p.image, p.price FROM products p LEFT JOIN categories c ON p.category_id = c.id';
    const queryValues: Array<string | number> = [limit, limit * (page - 1)];

    if (search) {
      query = `${query} WHERE LOWER(p.name) LIKE $3`;
      queryValues.push(`%${search.toLowerCase()}%`);
    }

    query = `${query} LIMIT $1 OFFSET $2`;

    try {
      const resultProducts = await this.conn.query(query, queryValues);

      if (resultProducts.rowCount === 0) {
        throw new Error(ERROR_CODE[404]);
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
        pagination: {
          limit,
          page,
          search,
        },
        errorCode: '',
      };
    } catch (error) {
      return {
        success: false,
        products: [],
        pagination: {
          limit: 0,
          page: 0,
          search: '',
        },
        errorCode: ERROR_CODE[error.message] || ERROR_CODE[500],
      };
    }
  }

  async getById(
    id: number,
  ): Promise<{ success: boolean; product: Product | null; errorCode: string }> {
    try {
      const resultProduct = await this.conn.query(
        `SELECT p.id, p.category_id, c.name AS category_name, p.sku, p.name, p.description, p.weight, p.width, p.length, p.height, p.image, p.price FROM products p LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1`,
        [id],
      );

      if (resultProduct.rowCount === 0) {
        throw new Error(ERROR_CODE[404]);
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
        errorCode: '',
      };
    } catch (error) {
      return {
        success: false,
        product: null,
        errorCode: ERROR_CODE[error.message] || ERROR_CODE[500],
      };
    }
  }
}
