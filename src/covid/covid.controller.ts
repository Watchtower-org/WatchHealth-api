import { Controller, Get, Param } from '@nestjs/common';
import { CovidService } from './covid.service';

@Controller('covid')
export class CovidController {
    constructor(private readonly covidService: CovidService) {}


    @Get('estado/:uf')
    async getCovidDataByState(@Param('uf') uf: string) {
      try {
        const data = await this.covidService.getCovidData(uf);
        return data; 
      } catch (error) {
        return { error: 'Erro ao obter os dados de COVID' };
      }
    }

    @Get('teste')
    async sendCovidNewsletter() {
      try {
        const data = await this.covidService.sendCovidNewsletter();
        return data; 
      } catch (error) {
        return { error: 'Erro ao obter os dados de COVID' };
      }
    }
}
