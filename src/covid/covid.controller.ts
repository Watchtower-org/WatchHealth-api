import { Controller, Get, Param } from '@nestjs/common';
import { CovidService } from './covid.service';
import { ApiOperation, ApiResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Covid')
@Controller('covid')
export class CovidController {
  constructor(private readonly covidService: CovidService) {}

  @Get('estado/:uf')
  @ApiOperation({ summary: 'Obtém dados de COVID-19 por estado' })
  @ApiParam({ name: 'uf', required: true, description: 'UF do estado (ex: SP, RJ)' })
  @ApiResponse({ status: 200, description: 'Dados de COVID-19 do estado', type: Object })
  @ApiResponse({ status: 400, description: 'Erro ao obter os dados de COVID' })
  async getCovidDataByState(@Param('uf') uf: string) {
    try {
      const data = await this.covidService.getCovidData(uf);
      return data; 
    } catch (error) {
      return { error: 'Erro ao obter os dados de COVID' };
    }
  }

  @Get('teste')
  @ApiOperation({ summary: 'Envia a newsletter de COVID-19' })
  @ApiResponse({ status: 200, description: 'Newsletter de COVID-19 enviada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Erro ao enviar a newsletter' })
  async sendCovidNewsletter() {
    try {
      const data = await this.covidService.sendCovidNewsletter();
      return data; 
    } catch (error) {
      return { error: 'Erro ao enviar a newsletter' };
    }
  }
}
