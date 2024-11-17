import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';
import { DengueService } from 'src/dengue/dengue.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CovidService } from 'src/covid/covid.service';
import { LegislationService } from 'src/legislation/legislation.service';
import { GeminiProvider } from 'src/llm/gemini.provider';
import { BlueSkyProvider } from 'src/bots/providers/blue-sky.provider';
import { NostrProvider } from 'src/bots/providers/nostr.provider';

@Module({
  imports: [HttpModule],
  providers: [RssService,DengueService,EmailService,UserService,PrismaService,CovidService,LegislationService,GeminiProvider,BlueSkyProvider,NostrProvider],
  controllers: [RssController]
})
export class RssModule {}
