import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

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
  
}

export class CreateUserDTO extends UserDTO{

}