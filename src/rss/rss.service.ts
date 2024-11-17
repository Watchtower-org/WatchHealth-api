import { Injectable } from '@nestjs/common';
import * as RSS from 'rss';

@Injectable()
export class RssService {

  getRssCovidData(data: any[]): string {
    const feed = new RSS({
      title: 'Dados de COVID no Brasil',
      description: 'Feed RSS com os últimos dados de dengue por estado',
      link: 'https://www.seusite.com.br/dengue',
      language: 'pt-br',
    });

    data.forEach((item) => {
      feed.item({
        title: `COVID em ${item.state} (${item.uf})`,
        description: `Casos: ${item.cases}, Mortes: ${item.deaths}, Suspeitos: ${item.suspects}, Recusados: ${item.refuses}`,
        link: `https://www.seusite.com.br/dengue/${item.uid}`,
        date: new Date(item.datetime),
      });
    });

    return feed.xml();
  }

  getRssDengueData(data: any[]): string {
    const feed = new RSS({
      title: 'Dados de Dengue no Brasil',
      description: 'Feed RSS com os últimos dados de dengue por estado',
      link: 'https://www.seusite.com.br/dengue',
      language: 'pt-br',
    });

    data.forEach((item) => {
      feed.item({
        title: `Casos de Dengue com base disease e ibgeCode`,
        description: `
          Casos Estaduais: ${item.casos_est}, 
          Casos Confirmados: ${item.casos}, 
          Rt: ${item.Rt}, 
          Temperatura Média: ${item.tempmed}°C, 
          Umidade Média: ${item.umidmed}%
        `,
        link: `https://www.seusite.com.br/dengue/${item.id}`,
        date: new Date(item.data_iniSE),
      });
    });

    return feed.xml();
  }

  getRssLegislationData(data: any[]): string {
    const feed = new RSS({
      title: 'Legislação Brasileira',
      description: 'Feed RSS com as últimas legislações publicadas',
      link: 'https://www.seusite.com.br/legislacao',
      language: 'pt-br',
    });

    data.forEach((item) => {
      const keywords = item.keywords ? item.keywords.join(', ') : 'Sem palavras-chave';
      const pubDate = item.date ? new Date(item.date).toUTCString() : 'Data não disponível';
      
      feed.item({
        title: `${item.tipo} - ${item.id}`,
        description: `
          Ementa: ${item.ementa}, 
          Palavras-chave: ${keywords},
          Texto completo: ${item.text}
        `,
        link: `https://www.seusite.com.br/legislacao/${item.id}`,
        date: pubDate,
      });
    });

    return feed.xml();
  }


}
