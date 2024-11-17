import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';

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


  async sendEmailWelcome(to: string, name: string) {
    console.log(to);

    const fs = require('fs');
    const emailHtml = fs.readFileSync(path.join(__dirname, '../templates/welcome.html'), 'utf-8');
    const welcomeHtml = emailHtml.replace('{{name}}', name);


    const mailOptions = {
      from: 'hackaton2024asd@gmail.com',
      to,
      subject: "Bem-vindo à nossa plataforma!",
      html: welcomeHtml,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  }

  async sendEmailDengue(to: string, name: string, dengueContent: string) {
    try {
      const emailHtml = fs.readFileSync(path.join(__dirname, '../templates/dengue.html'), 'utf-8');
      const formattedHtml = emailHtml.replace('{{name}}', name).replace('{{dengueContent}}', dengueContent);

      const mailOptions = {
        from: 'hackaton2024asd@gmail.com',
        to,
        subject: 'Resumo de Casos de Dengue',
        html: formattedHtml,
      };


      await this.transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  }

  async sendEmailCovid(to: string, name: string, covidContent: string) {
    try {
      const emailHtml = fs.readFileSync(path.join(__dirname, '../templates/covid.html'), 'utf-8');
      const formattedHtml = emailHtml
        .replace('{{name}}', name)
        .replace('{{covidContent}}', covidContent);

      const mailOptions = {
        from: 'hackaton2024asd@gmail.com',
        to,
        subject: 'Resumo de Casos de COVID',
        html: formattedHtml,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  }

  async sendEmailLegislation(to: string, name: string, legislationContent: string, resText: string) {
    try {
      const emailHtml = fs.readFileSync('/Users/carlos/Desktop/hackaton/Watchtower-api/src/templates/legislation.html', 'utf-8');
      const formattedHtml = emailHtml
        .replace('{{name}}', name)
        .replace('{{resText}}', resText)
        .replace('{{legislationContent}}', legislationContent);

      const mailOptions = {
        from: 'hackaton2024asd@gmail.com',
        to,
        subject: 'Resumo de novas Leis da Legislação',
        html: formattedHtml,
      };

      await this.transporter.sendMail(mailOptions);
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  }

  // Function to send the newsletter email
  async sendEmailNewsletter(to: string, name: string, newsletterContent: string) {
    try {
      // Read the newsletter HTML template
      const emailHtml = fs.readFileSync(path.join(__dirname, '../templates/newsletter.html'), 'utf-8');

      // Replace placeholders with dynamic content
      const formattedHtml = emailHtml
        .replace('{{name}}', name)
        .replace('{{newsletterContent}}', newsletterContent);

      // Define the email options
      const mailOptions = {
        from: 'hackaton2024asd@gmail.com',  // Replace with the actual sender's email
        to,
        subject: 'Weekly Newsletter',
        html: formattedHtml,  // HTML content generated from the template
      };

      // Send the email using the transporter
      await this.transporter.sendMail(mailOptions);
      console.log('Email newsletter enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  }
}
