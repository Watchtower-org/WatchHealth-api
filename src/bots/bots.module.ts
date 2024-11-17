import { Module } from '@nestjs/common';
import { BlueSkyProvider } from './providers/blue-sky.provider';
import { NostrProvider } from './providers/nostr.provider';
import { CronBotsService } from './cron.service';
import { CovidModule } from 'src/covid/covid.module';

@Module({
  providers: [BlueSkyProvider, NostrProvider, CronBotsService],
  exports: [BlueSkyProvider, NostrProvider],
  imports: [CovidModule]
})
export class BotsModule {}
