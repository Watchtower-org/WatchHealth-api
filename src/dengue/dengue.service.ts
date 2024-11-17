import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Cron } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';

@Injectable()
export class DengueService {
    constructor(
        private readonly httpService: HttpService,
        private readonly emailService: EmailService,
        private readonly userService: UserService,
    ) { }

    getWeekNumber(date: Date): number {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const diff = date.getTime() - startDate.getTime();
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        const weekNumber = Math.ceil(diff / oneWeek);
        return weekNumber;
    }


    async getAlertData(
        geocode: string,
        disease: string,
        format: string,
        ew_start: number,
        ew_end: number,
        ey_start: number,
        ey_end: number,
      ) {
        const url = `https://info.dengue.mat.br/api/alertcity`;
    
        try {
          const response = await lastValueFrom(
            this.httpService.get(url, {
              params: {
                geocode,
                disease,
                format,
                ew_start,
                ew_end,
                ey_start,
                ey_end,
              },
            }),
          );
          return response.data;
        } catch (error) {
          throw new HttpException(
            'Erro ao consultar os dados de alerta.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }

    async getDengueData(ibgecode: string, disease:string) {

        const url = `https://info.dengue.mat.br/api/alertcity?geocode=${ibgecode}&disease=${disease}&format=json&ew_start=1&ew_end=1&ey_start=2024&ey_end=2024`;

        try {
            const response = await lastValueFrom(this.httpService.get(url, { responseType: 'json' }));
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados de dengue', error);
            throw error;
        }
    }

    async processDengueData(data: any[]): Promise<string> {
        const filteredData = data.filter((item) => item.casos > 0);

        let totalCasosEstimados = 0;
        let totalCasosConfirmados = 0;

        filteredData.forEach((item) => {
            totalCasosEstimados += item.casos_est;
            totalCasosConfirmados += item.casos;
        });

        const emailContent = `
      <h1>Resumo de Casos de Dengue</h1>
      <p><strong>Total de Casos Estimados:</strong> ${totalCasosEstimados}</p>
      <p><strong>Total de Casos Confirmados:</strong> ${totalCasosConfirmados}</p>
    `;

        return emailContent;
    }

    async sendWeeklyNewsletter() {
        try {
            const users = await this.userService.findManyByDengue();
    
            for (const user of users) {
                const dengueData = await this.getDengueData(user.ibgecode,'dengue');
                const formattedContent = await this.processDengueData(dengueData);
                await this.emailService.sendEmailDengue(user.email, user.name, formattedContent);
                console.log(`Newsletter enviada para: ${user.email}`);
            }
        } catch (error) {
            console.error('Erro ao enviar a newsletter:', error);
        }
    }
    
}
