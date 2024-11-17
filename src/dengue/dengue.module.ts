import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { DengueController } from './dengue.controller';
import { DengueService } from './dengue.service';


@Module({
  imports: [HttpModule],
  controllers: [DengueController],
  providers: [DengueService,EmailService,UserService,PrismaService],
})
export class DengueModule {}
