import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable, Logger } from '@nestjs/common';


@Injectable()
export class GeminiProvider {

  private genAI = new GoogleGenerativeAI(process.env.API_KEY);

  private model;

  constructor() {
    this.model = this.genAI.getGenerativeModel({model: "gemini-1.5-flash"});
  }


  summarize(prompt: string): string | Promise<string> {
    prompt = "Summarize: " + prompt;
    return this.model.generateContent([prompt]);
  }

}
