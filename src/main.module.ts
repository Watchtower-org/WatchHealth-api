import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { EmailModule } from './email/email.module';
import { LegislationModule } from './legislation/legislation.module';
import { DengueModule } from './dengue/dengue.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CovidModule } from './covid/covid.module';
import { LlmModule } from './llm/llm.module';
import { NewsModule } from './news/news.module';
import { RssModule } from './rss/rss.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    EmailModule,
    LegislationModule,
    CovidModule,
    DengueModule,
    ScheduleModule.forRoot(),
    LlmModule,
    NewsModule,
    ScheduleModule.forRoot(),
  ],
  providers: [PrismaService],
})
export class MainModule { }
