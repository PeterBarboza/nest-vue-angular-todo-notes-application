import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

import { CONFIG } from 'src/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const [signature, token] = authorization.split(' ');

      if (!signature || !token) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      if (signature !== 'Bearer') {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: CONFIG.jwtAccessTokenSecret,
      });

      Object.assign(req, {
        userData: {
          id: payload.sub,
        },
      });

      next();
    } catch (err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
