import { Injectable } from "@nestjs/common";
const translate = require("translatte");

@Injectable()
export class TranslatorProvider {
  translate(text: string): Promise<any> {
    return translate(text, {to: "pt"});
  }
}