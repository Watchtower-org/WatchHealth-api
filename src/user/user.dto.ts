import { ArrayNotEmpty } from "@nestjs/class-validator";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";

export enum News {
  LAW = 'LAW',
  BIDDING = 'BIDDING',
  NEWS = 'NEWS',
  COVID = 'COVID',
  DENGUE = 'DENGUE',
}


export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  uf: string;

  @ApiProperty()
  @IsString()
  ibgecode: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: [String],
    enum: News,
    description: 'Lista de interesses do usuário',
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(News, { each: true })
  news: News[];
}

export class CreateUserDTO extends OmitType(UserDTO, [
  'id'
]) { }

