import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { DB_CONNECTION, ERROR_CODE } from 'src/constants';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject(DB_CONNECTION) private conn: Pool) {}

  async create(
    user: Omit<User, 'id'>,
  ): Promise<{ success: boolean; user: User | null; errorCode: string }> {
    try {
      await this.conn.query('BEGIN');

      const resultUser = await this.conn.query(
        'INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *',
        [user.name, user.email, user.password],
      );

      if (resultUser.rowCount === 0) {
        throw new Error(ERROR_CODE[500]);
      }

      await this.conn.query('COMMIT');

      return {
        success: true,
        errorCode: '',
        user: {
          id: resultUser.rows[0].id,
          name: resultUser.rows[0].name,
          email: resultUser.rows[0].email,
          password: resultUser.rows[0].password,
        },
      };
    } catch (error) {
      await this.conn.query('ROLLBACK');

      return {
        success: false,
        errorCode: ERROR_CODE[error.message] || ERROR_CODE[500],
        user: null,
      };
    }
  }

  async getUserByEmail(
    email: string,
  ): Promise<{ success: boolean; user: User | null; errorCode: string }> {
    try {
      const resultUser = await this.conn.query(
        'SELECT * FROM users WHERE email = $1',
        [email],
      );

      if (resultUser.rowCount === 0) {
        throw new Error(ERROR_CODE[404]);
      }

      return {
        success: true,
        errorCode: '',
        user: {
          id: resultUser.rows[0].id,
          email: resultUser.rows[0].email,
          name: resultUser.rows[0].name,
          password: resultUser.rows[0].password,
        },
      };
    } catch (error) {
      return {
        success: false,
        errorCode: ERROR_CODE[error.message] || ERROR_CODE[500],
        user: null,
      };
    }
  }
}
