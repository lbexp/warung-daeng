import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { DB_CONNECTION, ERROR_CODE } from 'src/constants';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor(@Inject(DB_CONNECTION) private conn: Pool) {}

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
          email: resultUser.rows[0].email,
          id: resultUser.rows[0].id,
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
