import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { EmailModule } from './email/email.module';
import { LlmModule } from './llm/llm.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule, PrismaModule, EmailModule, LlmModule, ConfigModule.forRoot()],
  providers: [PrismaService],
})
export class AppModule { }
