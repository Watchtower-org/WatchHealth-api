import { Injectable } from "@nestjs/common";
import { BlueSkyProvider } from "./providers/blue-sky.provider";
import { NostrProvider } from "./providers/nostr.provider";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CovidService } from "src/covid/covid.service";


@Injectable()
export class CronBotsService {
  private statesUF: string[] =  [
     'AL',
     'AP',
     'AM',
     'BA',
     'CE',
     'DF',
     'ES',
     'GO',
     'MA',
     'MT',
     'MS',
     'MG',
     'PA',
     'PB',
     'PR',
     'PE',
     'PI',
     'RJ',
     'RN',
     'RS',
     'RO',
     'RR',
     'SC',
     'SP',
     'SE',
     'TO'
  ];
  constructor(
    private blueSkyProvider: BlueSkyProvider,
    private nostrProvider: NostrProvider,
    private covidService: CovidService
  ){}

  @Cron(CronExpression.EVERY_MINUTE)
  async sendMonthlyCovidReport() {
    console.log('Running cron job to send monthly COVID report');
    for (const uf of this.statesUF) {
      try {
        const { state, cases, deaths, suspects, refuses, datetime } = await this.covidService.getCovidData(uf);

        const message = `Report mensal (${state}):
        - Casos Confirmados: ${cases}
        - Óbitos Confirmados: ${deaths}
        - Casos Suspeitos: ${suspects}
        - Casos Refusados: ${refuses}
        - Data de Atualização: ${new Date(datetime).toLocaleString()}`;

        await Promise.all([
          this.blueSkyProvider.sendPost(message),
          this.nostrProvider.sendPost(message)
        ]);

        await new Promise(resolve => setTimeout(resolve, 15000));
      } catch (error) {
        console.error('Erro ao enviar a newsletter de COVID:', error);
      }
    }
  }
}