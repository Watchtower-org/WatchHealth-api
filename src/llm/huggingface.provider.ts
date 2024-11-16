import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HuggingFaceProvider {
  private readonly apiKey: string;
  private readonly url = "https://api-inference.huggingface.co/models/google/gemma-2-2b-it";
  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('HUGGING_API_KEY');
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await axios.post(
      this.url,
      {inputs: prompt},
      {headers: {Authorization: `Bearer ${this.apiKey}`, 'Content-Type': 'application/json'}});

    return response.data;
  }
}
