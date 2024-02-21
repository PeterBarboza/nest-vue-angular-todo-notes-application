import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaProvider } from 'src/prisma/prisma.provider';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserProvider {
  constructor(private prisma: PrismaProvider) {}

  async get(params: Prisma.UserFindUniqueArgs) {
    const result = await this.prisma.user.findUnique(params);

    return result;
  }
  async create({ email, password }: CreateUserDTO) {
    const result = await this.prisma.user.create({
      data: {
        email,
        password: password,
      },
    });

    return result;
  }
  async update(id: string, data: UpdateUserDTO) {
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
    return result;
  }
  async delete(id: string) {
    const result = await this.prisma.user.delete({
      where: {
        id,
      },
    });
    return result;
  }
}
