import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UserModule, PrismaModule, EmailModule],
  providers: [PrismaService],
})
export class MainModule { }
