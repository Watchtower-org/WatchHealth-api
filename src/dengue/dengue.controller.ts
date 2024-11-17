import { Controller, Get, Query } from '@nestjs/common';
import { DengueService } from './dengue.service';

@Controller('dengue')
export class DengueController {
    constructor(private readonly dengueService: DengueService) {}

    @Get('data')
    async getDengueData(@Query('ibgecode') ibgecode: string,@Query('disease') disease: string) {
      return this.dengueService.getDengueData(ibgecode,disease);
    }

    @Get('consulta')
    async getAlertData(
      @Query('geocode') geocode: string,
      @Query('disease') disease: string,
      @Query('format') format: string,
      @Query('ew_start') ew_start: number,
      @Query('ew_end') ew_end: number,
      @Query('ey_start') ey_start: number,
      @Query('ey_end') ey_end: number,
    ) {
      return this.dengueService.getAlertData(
        geocode,
        disease,
        format,
        ew_start,
        ew_end,
        ey_start,
        ey_end,
      );
    }

    @Get('teste')
    async sendWeeklyNewsletter() {
      return this.dengueService.sendWeeklyNewsletter();
    }
}
