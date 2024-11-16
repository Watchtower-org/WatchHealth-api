import { Body, Controller, Injectable, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostDTO } from './dtos/post.dto';
import { BlueSkyProvider } from './providers/blue-sky.provider';

@Controller('bots')
@UsePipes(new ValidationPipe({whitelist: true, transform: true}))
export class BotsController {
  constructor(private bsk: BlueSkyProvider) {}

  @Post()
  async create(@Body() body: PostDTO): Promise<void> {
    return await this.bsk.sendPost(body.text);
  }
}
