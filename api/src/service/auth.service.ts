import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ERROR_CODE } from 'src/constants';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ success: boolean; accessToken: string; errorCode: string }> {
    const result = await this.userService.getUserByEmail(email);

    if (!result.success) {
      return {
        success: result.success,
        errorCode: result.errorCode,
        accessToken: '',
      };
    }

    const user = result.user;

    if (user.password !== password) {
      return {
        success: false,
        errorCode: ERROR_CODE[400],
        accessToken: '',
      };
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    return {
      success: true,
      errorCode: '',
      accessToken,
    };
  }
}
