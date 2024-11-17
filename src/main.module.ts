import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { EmailModule } from './email/email.module';
import { DengueModule } from './dengue/dengue.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(),UserModule, PrismaModule, EmailModule, DengueModule],
  providers: [PrismaService],
})
export class MainModule { }
