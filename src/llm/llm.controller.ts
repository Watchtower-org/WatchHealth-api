import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { PromptDTO } from './dtos/prompt.dto';
import { GeminiProvider } from './gemini.provider';

@Controller('llm')
@UsePipes(new ValidationPipe({whitelist: true, transform: true}))
export class LlmController {
  constructor(private readonly gemini: GeminiProvider) {}

  @Post('summarize')
  async summarize(@Body() body: PromptDTO): Promise<string> {
    return this.gemini.summarize(body.prompt);
  }
}
