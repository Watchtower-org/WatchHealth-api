import { Controller, Get } from '@nestjs/common';
import { DengueService } from './dengue.service';

@Controller('dengue')
export class DengueController {
    constructor(private readonly dengueService: DengueService) {}

    @Get('data')
    async getDengueData() {
      return this.dengueService.getDengueData();
    }
    @Get('teste')
    async sendWeeklyNewsletter() {
      return this.dengueService.sendWeeklyNewsletter();
    }
}
