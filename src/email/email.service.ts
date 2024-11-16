import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'hackaton2024asd@gmail.com',
        pass: 'ffba cbti piwj ezqa',
      },
    });
  }

  async sendEmail(to: string) {
    console.log(to)
    const mailOptions = {
      from: 'hackaton2024asd@gmail.com',
      to,
      subject:"Testando envio de e-mail",
      text:"Este é um e-mail de teste",
      html: "<b>Este é um e-mail de teste em HTML</b>",
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  }
}
