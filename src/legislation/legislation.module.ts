import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LegislationService } from './legislation.service';
import { LegislationController } from './legislation.controller';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
import { LlmModule } from 'src/llm/llm.module';
import { BotsModule } from 'src/bots/bots.module';

@Module({
  imports: [HttpModule, LlmModule, BotsModule],
  providers: [LegislationService, UserService,PrismaService,EmailService],
  controllers: [LegislationController],
})
export class LegislationModule { }
