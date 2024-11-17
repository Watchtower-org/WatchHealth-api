import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { LegislationService } from './legislation.service';

@Controller('legislation')
export class LegislationController {
  constructor(private readonly legislationService: LegislationService) { }

  /**
   * Endpoint to fetch legislation data.
   * @param tipo The type of legislation (e.g., LEI).
   * @param ano The year of the legislation.
   * @returns The API response data.
   */
  @Get()
  async fetchLegislation(
    @Query('tipo') tipo: string,
    @Query('ano') ano: string,
    @Query('from') from: string,
  ): Promise<any> {
    // Set default value for 'tipo' if not provided
    if (!tipo) {
      tipo = 'LEI';
    }

    // Validate 'ano' parameter
    if (!ano) {
      throw new BadRequestException('The "ano" parameter is required.');
    }

    const year = parseInt(ano, 10);
    if (isNaN(year)) {
      throw new BadRequestException('The "ano" parameter must be a valid year.');
    }

    // Validate 'from' parameter
    let fromDate = null;
    if (from) {
      fromDate = new Date(from);
      if (isNaN(fromDate.getTime())) {
        throw new BadRequestException('The "from" parameter must be a valid date.');
      }
    }

    console.log(`Fetching legislation data for ${tipo} from ${year} (${ano})`);
    return this.legislationService.getLegislation(tipo, year, fromDate);
  }
}

