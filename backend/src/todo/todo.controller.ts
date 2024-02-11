import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Todo } from '@prisma/client';

import { TodoProvider } from './todo';
import { createTodoSchema, updateTodoSchema } from 'src/dtos/todo';
import { CreateTodoData, UpdateTodoData } from 'src/interfaces/todo';

@Controller('todo')
export class TodoController {
  constructor(private todoProvider: TodoProvider) {}

  @Get()
  async getMany(@Req() request: Request): Promise<Todo[]> {
    const userId = request.headers.authorization;

    return await this.todoProvider.getMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  @Post()
  async create(
    @Req() request: Request,
    @Body() data: Omit<CreateTodoData, 'userId'>,
  ): Promise<Todo> {
    const userId = request.headers.authorization;
    const parsedData = createTodoSchema.parse({ ...data, userId });

    return await this.todoProvider.create(parsedData as any);
  }

  @Patch('/:id')
  async update(
    @Req() request: Request,
    @Body() data: UpdateTodoData,
    @Param('id') id: string,
  ): Promise<null | string> {
    const userId = request.headers.authorization;
    const parsedData = updateTodoSchema.parse({ ...data, userId });

    const isOwner = await this.todoProvider.getOne({
      where: { id: id, user: { id: userId } },
      select: { id: true },
    });

    if (!isOwner) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.todoProvider.update(id, parsedData as any);
  }

  @Delete('/:id')
  async delete(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<null | string> {
    const userId = request.headers.authorization;

    const isOwner = await this.todoProvider.getOne({
      where: { id: id, user: { id: userId } },
      select: { id: true },
    });

    if (!isOwner) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.todoProvider.delete(id);
  }
}
