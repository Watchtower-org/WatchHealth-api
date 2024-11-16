import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        private emailService:EmailService
      ) {}
    async createUser(createUserDto: CreateUserDTO) {
        try {
          const user = await this.prismaService.user.create({
            data: createUserDto,
          });

        this.emailService.sendEmail(user.email,user.name); 
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
