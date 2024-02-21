import { Body, Controller, Post } from '@nestjs/common';

import { AuthProvider } from './auth';

import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { RefreshTokenDTO } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authProvider: AuthProvider) {}

  @Post('sign-in')
  async signIn(@Body() params: SignInDTO) {
    return await this.authProvider.signIn(params);
  }

  @Post('sign-up')
  async signUp(@Body() params: SignUpDTO) {
    return await this.authProvider.signUp(params);
  }

  @Post('refresh-token')
  async refreshToken(@Body() params: RefreshTokenDTO) {
    return await this.authProvider.refreshToken(params);
  }
}
