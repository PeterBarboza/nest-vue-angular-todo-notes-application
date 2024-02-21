import { Module } from '@nestjs/common';

import { TodoController } from './todo.controller';
import { TodoProvider } from './todo';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TodoController],
  providers: [TodoProvider],
  imports: [PrismaModule],
})
export class TodoModule {}
