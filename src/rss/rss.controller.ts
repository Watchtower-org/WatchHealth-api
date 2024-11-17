import { Controller, Get, Query } from '@nestjs/common';
import { DengueService } from 'src/dengue/dengue.service';
import { RssService } from './rss.service';
import { CovidService } from 'src/covid/covid.service';
import { LegislationService } from 'src/legislation/legislation.service';

@Controller('rss')
export class RssController {
    constructor(private readonly dengueService: DengueService,private readonly rssService: RssService,private readonly covidService: CovidService,private readonly legislationService:LegislationService) {}

    @Get('covid')
    async getRssCovidData(@Query('ibgecode') ibgecode: string) {
      const data = await this.covidService.getCovidData(ibgecode);
  
      return this.rssService.getRssCovidData([data]);
    }

    @Get('dengue')
    async getRssDengueData(@Query('ibgecode') ibgecode: string, @Query('disease') disease: string) {
      const data = await this.dengueService.getDengueData(ibgecode, disease);
      
      return this.rssService.getRssDengueData(data);
    }

    @Get('legislation')
    async getRssLegislationData(
        @Query('tipo') tipo: string,
        @Query('ano') ano: number,
        @Query('from') from: string | null
    ) {
        const fromDate = from ? new Date(from) : null;
        const data = await this.legislationService.getLegislation(tipo, ano, fromDate);
        return this.rssService.getRssLegislationData(data);
    }
}
