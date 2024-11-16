import { Module } from '@nestjs/common';
import { LlmController } from './llm.controller';
import { ConfigModule } from '@nestjs/config';
import { HuggingFaceProvider } from './huggingface.provider';
import { BotsModule } from 'src/bots/bots.module';

@Module({
  controllers: [LlmController],
  imports: [ConfigModule, BotsModule],
  providers: [HuggingFaceProvider],
})
export class LlmModule {}
