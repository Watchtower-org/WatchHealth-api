import { Module } from '@nestjs/common';
import { LlmController } from './llm.controller';
import { ConfigModule } from '@nestjs/config';
import { HuggingFaceProvider } from './huggingface.provider';

@Module({
  controllers: [LlmController],
  imports: [ConfigModule],
  providers: [HuggingFaceProvider],
})
export class LlmModule {}
