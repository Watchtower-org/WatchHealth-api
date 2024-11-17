import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class UserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
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
    description: 'Se o usuário tem interesse em leis',
    default: false,
  })
  @IsBoolean()
  law: boolean;

  @ApiProperty({
    description: 'Se o usuário tem interesse em licitações',
    default: false,
  })
  @IsBoolean()
  bidding: boolean;

  @ApiProperty({
    description: 'Se o usuário tem interesse em notícias gerais',
    default: false,
  })
  @IsBoolean()
  news: boolean;

  @ApiProperty({
    description: 'Se o usuário tem interesse em COVID-19',
    default: false,
  })
  @IsBoolean()
  covid: boolean;

  @ApiProperty({
    description: 'Se o usuário tem interesse em Dengue',
    default: false,
  })
  @IsBoolean()
  dengue: boolean;
}

export class CreateUserDTO extends OmitType(UserDTO, ['id']) { }
