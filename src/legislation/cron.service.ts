import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { LegislationService } from "./legislation.service";


@Injectable()
export class CronLegislationService {

  constructor(private readonly legislation: LegislationService) { }

  @Cron('*/3 * * * *')
  async newsletter() {
    console.log('Running cron job to fetch legislation data');
    await this.legislation.sendLegislacaoNewsletter();
  }
}