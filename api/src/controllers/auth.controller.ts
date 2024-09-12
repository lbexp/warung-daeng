import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import throwHttpException from 'src/helpers/throwHttpException';

import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from 'src/dtos/user.dto';
import { AuthService } from 'src/service/auth.service';
import { MetaResponse } from 'src/dtos/common.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async signUp(
    @Body() signUpRequest: SignUpRequest,
  ): Promise<MetaResponse<SignInResponse>> {
    const result = await this.authService.signUp({
      email: signUpRequest.email,
      name: signUpRequest.name,
      password: signUpRequest.password,
    });

    if (!result.success) {
      throw throwHttpException(result.errorCode);
    }

    return {
      message: 'Success',
      statusCode: HttpStatus.CREATED,
      data: {
        accessToken: result.accessToken,
      },
    };
  }

  @Post('login')
  async signIn(
    @Body() signInRequest: SignInRequest,
  ): Promise<MetaResponse<SignInResponse>> {
    const result = await this.authService.signIn(
      signInRequest.email,
      signInRequest.password,
    );

    if (!result.success) {
      throw throwHttpException(result.errorCode);
    }

    return {
      message: 'Success',
      statusCode: HttpStatus.CREATED,
      data: {
        accessToken: result.accessToken,
      },
    };
  }
}
