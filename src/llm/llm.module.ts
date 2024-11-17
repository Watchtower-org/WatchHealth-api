import { Module } from '@nestjs/common';
import { LlmController } from './llm.controller';
import { ConfigModule } from '@nestjs/config';
import { GeminiProvider } from './gemini.provider';
import { BotsModule } from 'src/bots/bots.module';

@Module({
  controllers: [LlmController],
  imports: [ConfigModule, BotsModule],
  providers: [GeminiProvider],
  exports: [GeminiProvider],
})
export class LlmModule {}

