import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LegislationService } from './legislation.service';
import { LegislationController } from './legislation.controller';

@Module({
  imports: [HttpModule],
  providers: [LegislationService],
  controllers: [LegislationController],
})
export class LegislationModule { }
