import { Module } from '@nestjs/common';
import { LlmModule } from './llm/llm.module';
import { ConfigModule } from '@nestjs/config';
import { BotsModule } from './bots/bots.module';


@Module({
  imports: [LlmModule, ConfigModule.forRoot(), BotsModule],
})
export class AppModule { }
  