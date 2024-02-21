import { Module } from '@nestjs/common';

import { UserProvider } from './user';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UserProvider],
  imports: [PrismaModule],
})
export class UserModule {}
