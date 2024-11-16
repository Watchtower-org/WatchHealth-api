import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService
      ) {}
    async createUser(createUserDto: CreateUserDTO) {
        try {
          const user = await this.prismaService.user.create({
            data: createUserDto,
          });
    
          return {
            statusCode: 200,
            data: user,
          };
        } catch (error) {
          if (error.code === 'P2002') {
            throw new BadRequestException('Já existe um usuário com este email.');
          }
    
          throw new InternalServerErrorException(
            'Erro ao criar o usuário: ' + error.message,
          );
        }
      }
    
}
