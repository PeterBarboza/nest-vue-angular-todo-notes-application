import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import argon2 from 'argon2';

import { CONFIG } from 'src/config';
import { SignInParams, SignUpParams } from 'src/interfaces/auth';
import { UserProvider } from 'src/routes/user/user';

@Injectable()
export class AuthProvider {
  constructor(
    private userProvider: UserProvider,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInParams) {
    const result = await this.userProvider.get({
      where: {
        email,
      },
    });

    if (!result) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const isCorrectPassword = await argon2.verify(result.password, password);

    if (!isCorrectPassword) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const { token, refreshToken } = this.generateTokens(result.id);

    return {
      token,
      refreshToken,
      user: {
        id: result.id,
        email: result.email,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    };
  }
  async signUp({ email, password }: SignUpParams) {
    const result = await this.userProvider.get({
      where: {
        email,
      },
    });

    if (result) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const hashedPassword = await argon2.hash(password);

    await this.userProvider.create({ email, password: hashedPassword });

    return await this.signIn({ email, password });
  }
  async refreshToken(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: CONFIG.jwtRefreshTokenSecret,
    });

    if (!payload || !payload?.sub) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const result = await this.userProvider.get({
      where: {
        id: payload.sub,
      },
    });

    if (!result) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const { token, refreshToken: newRefreshToken } = this.generateTokens(
      result.id,
    );

    return {
      token,
      refreshToken: newRefreshToken,
      user: {
        id: result.id,
        email: result.email,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      },
    };
  }

  private generateTokens(userId: string) {
    const token = this.jwtService.sign(
      { sub: userId },
      { expiresIn: '900s', secret: CONFIG.jwtAccessTokenSecret },
    );
    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { expiresIn: '7d', secret: CONFIG.jwtRefreshTokenSecret },
    );

    return {
      token,
      refreshToken,
    };
  }
}
