import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController]
})
export class AppModule { }
