import { Controller, Get, Query } from '@nestjs/common';
import { DengueService } from './dengue.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Dengue')
@Controller('dengue')
export class DengueController {
  constructor(private readonly dengueService: DengueService) {}

  @Get('data')
  @ApiOperation({ summary: 'Obtém dados sobre a Dengue' })
  @ApiQuery({ name: 'ibgecode', required: true, description: 'Código IBGE do município' })
  @ApiQuery({ name: 'disease', required: true, description: 'Nome da doença (ex: dengue)' })
  @ApiResponse({ status: 200, description: 'Dados de dengue', type: [Object] })
  async getDengueData(@Query('ibgecode') ibgecode: string, @Query('disease') disease: string) {
    return this.dengueService.getDengueData(ibgecode, disease);
  }

  @Get('data-expand')
  @ApiOperation({ summary: 'Obtém dados expandidos sobre a Dengue' })
  @ApiQuery({ name: 'geocode', required: true, description: 'Código geográfico' })
  @ApiQuery({ name: 'disease', required: true, description: 'Nome da doença' })
  @ApiQuery({ name: 'format', required: true, description: 'Formato dos dados' })
  @ApiQuery({ name: 'ew_start', required: true, description: 'Data inicial do alerta' })
  @ApiQuery({ name: 'ew_end', required: true, description: 'Data final do alerta' })
  @ApiQuery({ name: 'ey_start', required: true, description: 'Ano inicial do alerta' })
  @ApiQuery({ name: 'ey_end', required: true, description: 'Ano final do alerta' })
  @ApiResponse({ status: 200, description: 'Dados expandidos sobre a Dengue', type: [Object] })
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

  @Get('cron')
  @ApiOperation({ summary: 'Envia a newsletter semanal sobre a Dengue' })
  @ApiResponse({ status: 200, description: 'Newsletter semanal enviada com sucesso.' })
  async sendWeeklyNewsletter() {
    return this.dengueService.sendWeeklyNewsletter();
  }
}
