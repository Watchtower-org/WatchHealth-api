import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService,EmailService],
  imports: [PrismaModule],
})
export class UserModule {}
