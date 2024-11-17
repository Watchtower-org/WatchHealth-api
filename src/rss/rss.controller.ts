import { Controller, Get, Query } from '@nestjs/common';
import { DengueService } from 'src/dengue/dengue.service';
import { RssService } from './rss.service';
import { CovidService } from 'src/covid/covid.service';
import { LegislationService } from 'src/legislation/legislation.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('RSS')  // Adiciona a tag para agrupar as rotas no Swagger
@Controller('rss')
export class RssController {
  constructor(
    private readonly dengueService: DengueService,
    private readonly rssService: RssService,
    private readonly covidService: CovidService,
    private readonly legislationService: LegislationService
  ) {}

  @Get('covid')
  @ApiOperation({ summary: 'Obtém dados RSS sobre a Covid-19' })  
  @ApiQuery({ name: 'uf', required: true, description: 'Código UF do município' })  
  async getRssCovidData(@Query('uf') uf: string) {
    const data = await this.covidService.getCovidData(uf);
    return this.rssService.getRssCovidData([data]);
  }

  @Get('dengue')
  @ApiOperation({ summary: 'Obtém dados RSS sobre a Dengue' })  
  @ApiQuery({ name: 'ibgecode', required: true, description: 'Código IBGE do município' })  
  @ApiQuery({ name: 'disease', required: true, description: 'Nome da doença (por exemplo, dengue)' })  
  async getRssDengueData(
    @Query('ibgecode') ibgecode: string,
    @Query('disease') disease: string
  ) {
    const data = await this.dengueService.getDengueData(ibgecode, disease);
    return this.rssService.getRssDengueData(data);
  }

  @Get('legislation')
  @ApiOperation({ summary: 'Obtém dados RSS sobre a Legislação' })  
  @ApiQuery({ name: 'tipo', required: true, description: 'Tipo da legislação' })  
  @ApiQuery({ name: 'ano', required: true, description: 'Ano da legislação' })  
  @ApiQuery({ name: 'from', required: false, description: 'Data de início (formato: yyyy-mm-dd)' })  
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
