import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LegislationService } from './legislation.service';
import { LegislationController } from './legislation.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [HttpModule],
  providers: [LegislationService, UserService,PrismaService,EmailService],
  controllers: [LegislationController],
})
export class LegislationModule { }
