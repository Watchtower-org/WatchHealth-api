import { Controller, Get, Query, Res } from '@nestjs/common';
import { DengueService } from 'src/dengue/dengue.service';
import { RssService } from './rss.service';
import { CovidService } from 'src/covid/covid.service';
import { LegislationService } from 'src/legislation/legislation.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';


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
  @ApiQuery({ name: 'uf', required: true, description: 'UF do município' })
  async getRssCovidData(@Query('uf') uf: string, @Res() res: Response) {
    const data = await this.covidService.getCovidData(uf);
    const rssData = await this.rssService.getRssCovidData([data]);

    res.set('Content-Type', 'application/rss+xml');
    return res.send(rssData);
  }
  @Get('dengue')
  @ApiOperation({ summary: 'Obtém dados RSS sobre a Dengue' })
  @ApiQuery({ name: 'ibgecode', required: true, description: 'Código IBGE do município' })
  @ApiQuery({ name: 'disease', required: true, description: 'Nome da doença (por exemplo, dengue)' })
  async getRssDengueData(
    @Query('ibgecode') ibgecode: string,
    @Query('disease') disease: string,
    @Res() res: Response,
  ) {
    const data = await this.dengueService.getDengueData(ibgecode, disease);
    const rssData = await this.rssService.getRssDengueData(data);

    res.set('Content-Type', 'application/rss+xml');
    return res.send(rssData);
  }

  @Get('legislation')
  @ApiOperation({ summary: 'Obtém dados RSS sobre a Legislação' })
  @ApiQuery({ name: 'tipo', required: true, description: 'Tipo da legislação' })
  @ApiQuery({ name: 'ano', required: true, description: 'Ano da legislação' })
  @ApiQuery({ name: 'from', required: false, description: 'Data de início (formato: yyyy-mm-dd)' })
  async getRssLegislationData(
    @Query('tipo') tipo: string,
    @Query('ano') ano: number,
    @Query('from') from: string | null,
    @Res() res: Response,
  ) {
    const fromDate = from ? new Date(from) : null;
    const data = await this.legislationService.getLegislation(tipo, ano, fromDate);
    const rssData = await this.rssService.getRssLegislationData(data);

    res.set('Content-Type', 'application/rss+xml');
    return res.send(rssData);
  }
}
