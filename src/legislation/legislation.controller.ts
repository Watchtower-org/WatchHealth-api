import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { Legislation, LegislationService } from './legislation.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Legislation')  
@Controller('legislation')
export class LegislationController {
  constructor(private readonly legislationService: LegislationService) { }

  @Get('data')
  @ApiOperation({ summary: 'Obtém dados de legislação' }) 
  @ApiQuery({ name: 'tipo', required: true, description: 'Tipo de legislação (ex: federal, estadual)' })  
  @ApiQuery({ name: 'ano', required: true, description: 'Ano da legislação' })  
  @ApiQuery({ name: 'from', required: false, description: 'Data de início da legislação (formato ISO)' }) 
  @ApiResponse({ status: 400, description: 'Erro ao processar a solicitação' }) 
  async getLegislation(
    @Query('tipo') tipo: string,
    @Query('ano') ano: number,
    @Query('from') from: string | null,
  ): Promise<Legislation[]> {
    if (!tipo || !ano) {
      throw new BadRequestException('Os parâmetros "tipo" e "ano" são obrigatórios.');
    }

    const fromDate = from ? new Date(from) : null;
    return this.legislationService.getLegislation(tipo, ano, fromDate);
  }

  @Get('cron')
  @ApiOperation({ summary: 'Envia a newsletter de legislação' })  
  @ApiResponse({ status: 200, description: 'Newsletter de legislação enviada com sucesso.' })  
  @ApiResponse({ status: 500, description: 'Erro ao enviar a newsletter' }) 
  async sendLegislacaoNewsletter() {
    return this.legislationService.sendLegislacaoNewsletter();
  }
}
