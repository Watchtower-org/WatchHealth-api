import { Module } from '@nestjs/common';
import { BlueSkyProvider } from './providers/blue-sky.provider';

@Module({
  providers: [BlueSkyProvider],
  exports: [BlueSkyProvider],
})
export class BotsModule {}
