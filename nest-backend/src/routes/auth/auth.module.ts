import { Module } from '@nestjs/common';

import { AuthProvider } from './auth';
import { AuthController } from './auth.controller';
import { UserProvider } from 'src/routes/user/user';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [AuthProvider, UserProvider],
  controllers: [AuthController],
  imports: [PrismaModule],
})
export class AuthModule {}
