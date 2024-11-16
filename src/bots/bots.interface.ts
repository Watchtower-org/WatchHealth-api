
export abstract class Bot {
  abstract sendPost(text: string): Promise<void>;
}