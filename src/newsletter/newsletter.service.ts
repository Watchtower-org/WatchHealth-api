import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { UserService } from '../user/user.service';
import { NewsPost, NewsService } from 'src/news/news.service';

@Injectable()
export class NewsletterService {
  constructor(
    private readonly emailService: EmailService,
    private readonly userService: UserService,
    private readonly newsService: NewsService,
  ) { }

  // Function to generate content for the newsletter
  async generateNewsletterContent(news: NewsPost[]): Promise<string> {
    let content = `
      <h1>Weekly Newsletter</h1>
      <p>Confira as últimas notícias:</p>
      <ul>
    `;

    // Loop through the news posts and format them into list items
    news.forEach((post) => {
      content += `
        <li>
          <h3><a href="${post.link}" target="_blank">${post.title}</a></h3>
          <p><strong>Fonte:</strong> ${post.source}</p>
          <p><strong>Publicado em:</strong> ${post.pubDate.toLocaleDateString()}</p>
          <p>${post.description}</p>
        </li>
      `;
    });

    content += '</ul>';

    return content;
  }

  // Function to send the newsletter to all users
  async sendWeeklyNewsletter() {
    try {
      const users = await this.userService.findManyByNews();

      let news = await this.newsService.getAllNews();

      // last 7 days news
      news = news.filter((item) => item.pubDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

      // get last 5 news
      news = news.slice(-5);

      // Generate the newsletter content
      const newsletterContent = await this.generateNewsletterContent(news);

      // Send the newsletter to all users
      for (const user of users) {
        await this.emailService.sendEmailNewsletter(user.email, user.name, newsletterContent);
        console.log(`Newsletter enviada para: ${user.email}`);
      }
    } catch (error) {
      console.error('Erro ao enviar a newsletter:', error);
    }
  }
}

