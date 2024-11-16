import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { PromptDTO } from './dtos/prompt.dto';
import { HuggingFaceProvider } from './huggingface.provider';

@Controller('llm')
@UsePipes(new ValidationPipe({whitelist: true, transform: true}))
export class LlmController {
  constructor(private readonly openAiService: HuggingFaceProvider) {}

  @Post('ask')
  async askQuestion(@Body() body: PromptDTO): Promise<string> {
    return this.openAiService.generateResponse(body.prompt);
  }
}
