import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from './prisma/prisma.module';

import { TodoModule } from './modules/todo/todo.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthMiddleware } from './modules/auth/auth.middleware';

import { AppController } from './app.controller';

@Module({
  imports: [
    TodoModule,
    PrismaModule,
    UserModule,
    JwtModule.register({
      global: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('todo');
  }
}
