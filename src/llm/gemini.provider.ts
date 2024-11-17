import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class GeminiProvider {

  private genAI = new GoogleGenerativeAI(process.env.API_KEY);

  private model;

  constructor() {
    this.model = this.genAI.getGenerativeModel({model: "gemini-1.5-flash"});
  }


  async summarize(prompt: string): Promise<string> {
    prompt = "Sumarize o texto a seguir para um post no bluesky: " + prompt;
    const res = await this.model.generateContent([prompt]);

    return res.response.candidates[0].content.parts[0].text;
  }

}
