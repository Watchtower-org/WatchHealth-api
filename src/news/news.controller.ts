import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { NewsService } from './news.service';
import { Response } from 'express'; // Import Response type to handle the response

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  // Route to get news from the database
  @Get()
  async getNews(@Res() res: Response) {
    try {
      // Fetch news from the database
      const news = await this.newsService.getAllNews();
      return res.status(HttpStatus.OK).json(news);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching news', error });
    }
  }

  // Route to trigger a database update by fetching new posts and saving them
  @Get('update')
  async updateNews(@Res() res: Response) {
    try {
      // Trigger the fetch and update process
      const news = await this.newsService.fetchNews();
      this.newsService.createNewsPosts(news);
      return res.status(HttpStatus.OK).json({ message: 'News database updated successfully' });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error updating news', error });
    }
  }
}

