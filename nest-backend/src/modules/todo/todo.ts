import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';

import { PrismaProvider } from 'src/prisma/prisma.provider';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Injectable()
export class TodoProvider {
  data: Todo[] = [];

  constructor(private prisma: PrismaProvider) {}

  async getMany(params?: Prisma.TodoFindManyArgs): Promise<Todo[]> {
    return await this.prisma.todo.findMany(params);
  }
  async getOne(params?: Prisma.TodoFindFirstArgs): Promise<Todo | null> {
    return await this.prisma.todo.findFirst(params);
  }
  async create({ userId, ...data }: CreateTodoDTO): Promise<Todo> {
    return await this.prisma.todo.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  async update(id: string, data: UpdateTodoDTO): Promise<null | string> {
    const result = await this.prisma.todo.update({
      where: {
        id,
      },
      data,
    });

    return result?.id || null;
  }
  async delete(id: string): Promise<null | string> {
    const result = await this.prisma.todo.delete({
      where: {
        id,
      },
    });

    return result?.id || null;
  }
}
