import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { EmailModule } from './email/email.module';
import { LegislationModule } from './legislation/legislation.module';
import { DengueModule } from './dengue/dengue.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CovidModule } from './covid/covid.module';

@Module({
  imports: [UserModule, PrismaModule, EmailModule, LegislationModule],
  providers: [PrismaService],
})
export class MainModule { }
