import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { NewsService } from 'src/news/news.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [PrismaService, EmailService, UserService, NewsService, NewsletterService],
  controllers: [NewsletterController]
})
export class NewsletterModule { }
