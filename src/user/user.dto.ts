import { ApiProperty, OmitType } from "@nestjs/swagger";
import { News } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

export class UserDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    id: number;

    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty({
        enum: News, 
        enumName: 'News',
      })
      @IsEnum(News) 
      news: News;
  
}

export class CreateUserDTO extends OmitType(UserDTO, [
    'id'
  ]) {}