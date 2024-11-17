import { Injectable } from "@nestjs/common";
import { AtpAgent } from '@atproto/api';
import { Bot } from "../bots.interface";

@Injectable()
export class BlueSkyProvider implements Bot {
  private agent = new AtpAgent({service: 'https://bsky.social'});

  async sendPost(text: string): Promise<any> {
    console.log(process.env.BLUESKY_USERNAME!, process.env.BLUESKY_PASSWORD!);
    await this.agent.login({identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD!});
    return await this.agent.post({text});
  }
}