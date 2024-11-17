import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';
import { DengueService } from 'src/dengue/dengue.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CovidService } from 'src/covid/covid.service';

@Module({
  imports: [HttpModule],
  providers: [RssService,DengueService,EmailService,UserService,PrismaService,CovidService],
  controllers: [RssController]
})
export class RssModule {}
