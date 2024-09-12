import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { ERROR_CODE } from 'src/constants';
import { User } from 'src/entities/user.entity';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(
    user: Omit<User, 'id'>,
  ): Promise<{ success: boolean; accessToken: string; errorCode: string }> {
    const hashedPassword = await bcrypt.hash(
      user.password,
      this.configService.get('bcrypt.salt'),
    );
    const result = await this.userService.create({
      email: user.email,
      name: user.name,
      password: hashedPassword,
    });

    if (!result.success) {
      return {
        success: result.success,
        errorCode: result.errorCode,
        accessToken: '',
      };
    }

    const accessToken = await this.jwtService.signAsync({
      sub: result.user.id,
      email: result.user.email,
      name: result.user.name,
    });

    return {
      success: true,
      errorCode: '',
      accessToken,
    };
  }

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
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
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
