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
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

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
    @Body() data: CreateTodoDTO,
  ): Promise<Todo> {
    const userId = request?.userData?.id;

    return await this.todoProvider.create({ userId, ...data });
  }

  @Patch('/:id')
  async update(
    @Req() request: Request,
    @Body() data: UpdateTodoDTO,
    @Param('id') id: string,
  ): Promise<null | string> {
    const userId = request?.userData?.id;

    const isOwner = await this.todoProvider.getOne({
      where: { id: id, user: { id: userId } },
      select: { id: true },
    });

    if (!isOwner) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.todoProvider.update(id, data);
  }

  @Delete('/:id')
  async delete(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<null | string> {
    const userId = request?.userData?.id;

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
