import { Controller, Get, Query } from '@nestjs/common';
import { DengueService } from './dengue.service';

@Controller('dengue')
export class DengueController {
    constructor(private readonly dengueService: DengueService) {}

    @Get('data')
    async getDengueData(@Query('ibgecode') ibgecode: string,) {
      return this.dengueService.getDengueData(ibgecode);
    }
    @Get('teste')
    async sendWeeklyNewsletter() {
      return this.dengueService.sendWeeklyNewsletter();
    }
}
