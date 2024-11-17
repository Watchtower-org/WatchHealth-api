import { Controller, Get } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) { }

  // @Get('data')
  // async getDengueData(@Query('ibgecode') ibgecode: string,) {
  //   return this.dengueService.getDengueData(ibgecode);
  // }
  @Get('teste')
  async sendWeeklyNewsletter() {
    return this.newsletterService.sendWeeklyNewsletter();
  }
}
