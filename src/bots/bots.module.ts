import { Module } from '@nestjs/common';
import { BlueSkyProvider } from './providers/blue-sky.provider';
import { NostrProvider } from './providers/nostr.provider';

@Module({
  providers: [BlueSkyProvider, NostrProvider],
  exports: [BlueSkyProvider, NostrProvider],
})
export class BotsModule {}
