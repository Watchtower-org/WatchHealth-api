import { Module } from '@nestjs/common';
import { DengueController } from './dengue.controller';
import { DengueService } from './dengue.service';
import { HttpModule } from '@nestjs/axios';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [DengueController],
  providers: [DengueService,EmailService,UserService,PrismaService]
})
export class DengueModule {}
