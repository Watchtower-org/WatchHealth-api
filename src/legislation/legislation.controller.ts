import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Legislation, LegislationService } from './legislation.service';

@Controller('legislation')
export class LegislationController {
  constructor(private readonly legislationService: LegislationService) { }

  @Get()
  async getLegislation(
    @Query('tipo') tipo: string,
    @Query('ano') ano: number,
    @Query('from') from: string | null,
  ): Promise<Legislation[]> {
    const fromDate = from ? new Date(from) : null;
    return this.legislationService.getLegislation(tipo, ano, fromDate);
  }

  @Get('teste')
  async sendLegislacaoNewsletter( ) {
     return this.legislationService.sendLegislacaoNewsletter();
  }
}

