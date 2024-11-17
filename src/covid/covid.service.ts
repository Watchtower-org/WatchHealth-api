import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CovidService {
  constructor(
    private readonly httpService: HttpService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  async getCovidData(uf: string) {
    const url = `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${uf}`;

    try {
      const response = await lastValueFrom(this.httpService.get(url, { responseType: 'json' }));
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados de COVID', error);
      throw error;
    }
  }

  async processCovidData(data: any): Promise<string> {
    if (data.error) {
      return `<h1>Erro: Estado não encontrado</h1>`;
    }

    const { state, cases, deaths, suspects, refuses, datetime } = data;

    const emailContent = `
      <h1>Resumo de Casos de COVID - ${state}</h1>
      <p><strong>Casos Confirmados:</strong> ${cases}</p>
      <p><strong>Óbitos Confirmados:</strong> ${deaths}</p>
      <p><strong>Casos Suspeitos:</strong> ${suspects}</p>
      <p><strong>Casos Refusados:</strong> ${refuses}</p>
      <p><strong>Data de Atualização:</strong> ${new Date(datetime).toLocaleString()}</p>
    `;

    return emailContent;
  }

  async sendCovidNewsletter() {
    try {
      const uf = 'MG'; 
      const covidData = await this.getCovidData(uf);
      const formattedContent = await this.processCovidData(covidData);

      const users = await this.userService.findManyByCovid();

      for (const user of users) {
        await this.emailService.sendEmailCovid(user.email, user.name, formattedContent);
        console.log(`Newsletter de COVID enviada para: ${user.email}`);
      }
    } catch (error) {
      console.error('Erro ao enviar a newsletter de COVID:', error);
    }
  }
}
