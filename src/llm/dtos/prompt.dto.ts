import { IsNotEmpty, IsString } from "@nestjs/class-validator";


export class PromptDTO {
  @IsString()
  @IsNotEmpty()
  prompt: string;
}