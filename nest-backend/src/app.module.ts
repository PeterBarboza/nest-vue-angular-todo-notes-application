import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from './prisma/prisma.module';

import { TodoModule } from './routes/todo/todo.module';
import { UserModule } from './routes/user/user.module';
import { AuthModule } from './routes/auth/auth.module';
import { AuthMiddleware } from './routes/auth/auth.middleware';

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
