import { Module } from '@nestjs/common';
import { LlmModule } from './llm/llm.module';
import { ConfigModule } from '@nestjs/config';
import { BotsModule } from './bots/bots.module';
import { AppModule } from './app/app.module';

@Module({
  imports: [LlmModule, ConfigModule.forRoot(), BotsModule, AppModule],
})
export class MainModule { }
