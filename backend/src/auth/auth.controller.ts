import { Body, Controller, Post } from '@nestjs/common';

import { AuthProvider } from './auth';
import {
  RefreshTokenParams,
  SignInParams,
  SignUpParams,
} from 'src/interfaces/auth';
import { refreshTokenSchema, signInSchema, signUpSchema } from 'src/dtos/auth';

@Controller('auth')
export class AuthController {
  constructor(private authProvider: AuthProvider) {}

  @Post('sign-in')
  async signIn(@Body() params: SignInParams) {
    const parsedParams = signInSchema.parse(params);

    return await this.authProvider.signIn(parsedParams as any);
  }

  @Post('sign-up')
  async signUp(@Body() params: SignUpParams) {
    const parsedParams = signUpSchema.parse(params);

    return await this.authProvider.signUp(parsedParams as any);
  }

  @Post('refresh-token')
  async refreshToken(@Body() params: RefreshTokenParams) {
    const parsedParams = refreshTokenSchema.parse(params);

    return await this.authProvider.refreshToken(
      parsedParams.refreshToken as any,
    );
  }
}
