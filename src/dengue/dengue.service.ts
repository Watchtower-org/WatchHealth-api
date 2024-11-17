import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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
  ) {}

  getWeekNumber(date: Date): number {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const diff = date.getTime() - startDate.getTime(); 
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const weekNumber = Math.ceil(diff / oneWeek); 
    return weekNumber;
  }

  async getDengueData() {
    const currentDate = new Date();
    const currentWeek = this.getWeekNumber(currentDate);

    const url = `https://info.dengue.mat.br/api/alertcity?geocode=3139904&disease=dengue&format=json&ew_start=${currentWeek}&ew_end=${currentWeek}&ey_start=2024&ey_end=2024`;

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
      const dengueData = await this.getDengueData();
      const formattedContent = await this.processDengueData(dengueData);

      const users = await this.userService.findAll();

      for (const user of users) {
        await this.emailService.sendEmailDengue(user.email, user.name, formattedContent);
        console.log(`Newsletter enviada para: ${user.email}`);
      }
    } catch (error) {
      console.error('Erro ao enviar a newsletter:', error);
    }
  }
}
