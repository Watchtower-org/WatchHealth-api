import { Module } from '@nestjs/common';
import { BlueSkyProvider } from './providers/blue-sky.provider';
import { BotsController } from './bots.controller';

@Module({
  providers: [BlueSkyProvider],
  controllers: [BotsController],
})
export class BotsModule {}
