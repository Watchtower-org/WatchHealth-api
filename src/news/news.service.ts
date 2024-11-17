import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface NewsPost {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  source: string;
}

@Injectable()
export class NewsService {
  private readonly GOV_RSS_URL =
    'https://www.gov.br/pt-br/noticias/saude-e-vigilancia-sanitaria/ultimas-noticias/RSS';
  private readonly CNN_RSS_URL = 'https://www.cnnbrasil.com.br/saude/feed';
  private readonly BV_SMS_RSS_URL = 'https://bvsms.saude.gov.br/feed/';

  constructor(private readonly httpService: HttpService) { }

  // Return new posts from all know sources, sorted by date.
  async fetchNews(): Promise<NewsPost[]> {
    // Fetch RSS feeds from all sources
    const govResponse = await firstValueFrom(
      this.httpService.get(this.GOV_RSS_URL, {
        headers: { Accept: 'application/rss+xml, application/atom+xml' },
      }),
    );

    const cnnResponse = await firstValueFrom(
      this.httpService.get(this.CNN_RSS_URL, {
        headers: { Accept: 'application/rss+xml, application/atom+xml' },
      }),
    );

    const bvsmsResponse = await firstValueFrom(
      this.httpService.get(this.BV_SMS_RSS_URL, {
        headers: { Accept: 'application/rss+xml, application/atom+xml' },
      }),
    );

    const parser = new XMLParser();

    // Parse RSS feeds
    const govFeedData = parser.parse(govResponse.data);
    const cnnFeedData = parser.parse(cnnResponse.data);
    const bvsmsFeedData = parser.parse(bvsmsResponse.data);

    const govItems = govFeedData["rdf:RDF"].item;
    const cnnItems = cnnFeedData.rss.channel.item;
    const bvsmsItems = bvsmsFeedData.rss.channel.item;

    // Process RSS feed items
    const govPosts = this.extractPosts(govItems, 'Governo Federal');
    const cnnPosts = this.extractPosts(cnnItems, 'CNN Brasil');
    const bvsmsPosts = this.extractPosts(bvsmsItems, 'Biblioteca Virtual em Saúde');

    // Combine all posts
    const allPosts = [...govPosts, ...cnnPosts, ...bvsmsPosts];

    // sort by date
    allPosts.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

    return allPosts;
  }

  // Helper method to extract posts from parsed RSS data
  private extractPosts(items: any[], source: string): NewsPost[] {
    return items.map((item: any) => ({
      title: item.title,
      link: item.link,
      description: item.description,
      pubDate: new Date(item['dc:date'] || item.pubDate),
      source,
    }));
  }
}

