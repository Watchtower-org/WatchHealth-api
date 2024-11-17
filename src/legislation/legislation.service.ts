import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { GeminiProvider } from 'src/llm/gemini.provider';
import { BlueSkyProvider } from 'src/bots/providers/blue-sky.provider';
import { NostrProvider } from 'src/bots/providers/nostr.provider';

export interface Legislation {
  id: string;
  tipo: string;
  date: Date;
  ementa: string;
  keywords: string[];
  text: string;
  url: string;
}

@Injectable()
export class LegislationService {
  private readonly apiUrl = 'https://legis.senado.leg.br/dadosabertos/legislacao/lista';

  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly geminiProvider: GeminiProvider,
    private readonly bskService: BlueSkyProvider,
    private readonly nostrService: NostrProvider,
  ) { }

  /**
   * Fetches legislation data by type and year.
   * @param tipo The type of legislation (e.g., LEI).
   * @param ano The year of the legislation.
   * @returns A promise resolving to the API response data.
   */
  async getLegislation(tipo: string, ano: number, from: Date | null): Promise<Legislation[]> {
    const url = `${this.apiUrl}?tipo=${tipo}&ano=${ano}`;
    console.log(`Fetching legislation data from ${url}`);
    const headers = {
      Accept: 'application/json',
    };
    const response = await firstValueFrom(this.httpService.get(url, { headers }));
    const list: Legislation[] = [];
    for (const legislation of response.data.ListaDocumento.documentos.documento) {
      try {
        // convert to Date, format is DD/MM/YYYY.
        const dataassinatura = legislation.dataassinatura.split('/');
        const date = new Date(`${dataassinatura[1]}/${dataassinatura[0]}/${dataassinatura[2]}`);

        if (from != null && date < from) {
          continue;
        }

        // check if 'ementa' contains word 'saúde'
        if (legislation.ementa.toLowerCase().includes('saúde')) {

          // make a request to https://legis.senado.leg.br/dadosabertos/legislacao/${id}
          const url = `https://legis.senado.leg.br/dadosabertos/legislacao/${legislation['@id']}`;
          // console.log(`Fetching legislation data from ${url}`);
          const legislacao = await firstValueFrom(this.httpService.get(url, { headers }));

          const url_urn = legislacao.data.DetalheDocumento.documentos.documento.identificacao.urlDocumento;
          // console.log(`URL URN: ${url_urn}`);

          // use regex to extrct urn from url
          const urn = url_urn.match(/urn:lex:(.*)/)[0];
          // console.log(`URN: ${urn}`);

          // make request to https://normas.leg.br/api/normas?urn=urn:lex:br:federal:lei:2023-12-27;14781&=&tipo_documento=maior-detalhe
          const url_normas = `https://normas.leg.br/api/normas?urn=${urn}&tipo_documento=maior-detalhe`;
          // console.log(`Fetching legislation data from ${url_normas}`);
          const normas = await firstValueFrom(this.httpService.get(url_normas, { headers }));

          const text_url = normas.data.encoding[0].contentUrl;
          // console.log(`Text URL: ${text_url}`);
          const keywords = normas.data.keywords;

          // make request to text_url
          // console.log(`Fetching legislation data from ${text_url}`);

          // This URL mysteriously returns 406, but starts to work when I make a
          // request from the browser. So I just copy the request the browser
          // make here.
          const text_html = await firstValueFrom(this.httpService.get(text_url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
              'Accept-Language': 'pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3',
              'Accept-Encoding': 'gzip, deflate, br, zstd',
              'Connection': 'keep-alive',
              'Upgrade-Insecure-Requests': '1',
              'Sec-Fetch-Dest': 'document',
              'Sec-Fetch-Mode': 'navigate',
              'Sec-Fetch-Site': 'none',
              'Sec-Fetch-User': '?1',
              'Priority': 'u=0, i'
            }
          }));

          // use cheerio to extract the text from the html
          // const cheerio = require('cheerio');
          // const text = cheerio.load(text_html.data)('body').text();
          const { convert } = require('html-to-text');
          const text = convert(text_html.data, {});

          // console.log(`Text: ${text}`);
          legislation.text = text;

          list.push({
            id: legislation['@id'],
            tipo: legislation.tipo,
            date: date,
            ementa: legislation.ementa,
            keywords,
            text: text,
            url: text_url,
          });

          console.log(`Legislation: ${legislation['@id']} - ${legislation.tipo} - ${date} - ${urn}`);

        }
      } catch (e) {
        console.error("Error: ", e.message);
        break;
      }
    }
    return list;

  }

  async sendLegislacaoNewsletter() {
    try {
      const tipo = 'LEI';
      const ano = 2024;
      const fromDate = new Date('2024-10-17');

      console.log('Buscando legislações...');
      const legislacoes = await this.getLegislation(tipo, ano, fromDate);

      if (!legislacoes.length) {
        console.log('Nenhuma legislação encontrada para os critérios especificados.');
        return;
      }

    console.log("Summarizing...");
    const resText = await this.geminiProvider.summarize(legislacoes.map(leg => leg.ementa + leg.text.substring(0, 30)).join(' '));
    const resTextEmail = await this.geminiProvider.summarizeToEmail(legislacoes.map(leg => leg.ementa + leg.text.substring(0, 30)).join(' '));

    console.log("Sending to BlueSky...");
    const res = await this.bskService.sendPost(resText);
    console.log("Sending to Nostr...");
    await this.nostrService.sendPost(resText);

    console.log('Buscando usuários para envio da newsletter...');
    const users = await this.userService.findManyByLaws();


      if (!users.length) {
        console.log('Nenhum usuário encontrado para envio da newsletter.');
        return;
      }
      console.log("teste", resText)

      for (const user of users) {
        const formattedContent = legislacoes
          .map((leg) => `
            <h3>${leg.tipo} - ${leg.date.toLocaleDateString('pt-BR')}</h3>
            <p><strong>Ementa:</strong> ${leg.ementa}</p>
            <p><strong>Palavras-chave:</strong> ${leg.keywords.join(', ')}</p>
            <p><strong>Texto completo:</strong></p>
          `)
          .join('<hr>');

        try {
          await this.emailService.sendEmailLegislation(user.email, user.name, formattedContent, resTextEmail);
          console.log(`Newsletter enviada com sucesso para: ${user.email}`);
        } catch (emailError) {
          console.error(`Erro ao enviar e-mail para ${user.email}:`, emailError.message);
        }
      }
    } catch (error) {
      console.error('Erro ao enviar a newsletter de legislações:', error.message);
    }
  }

}

