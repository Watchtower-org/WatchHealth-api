import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class GeminiProvider {

  private genAI = new GoogleGenerativeAI(process.env.API_KEY);

  private model;

  constructor() {
    this.model = this.genAI.getGenerativeModel({model: "gemini-1.5-flash"});
  }


  summarize(prompt: string): Promise<any> {
    prompt = "Sumarize o texto a seguir para um post no bluesky: " + prompt;
    return this.model.generateContent([prompt]);
  }

}
