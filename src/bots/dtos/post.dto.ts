import { IsNotEmpty, IsString } from "@nestjs/class-validator";


export class PostDTO {

  @IsString()
  @IsNotEmpty()
  text: string;
}