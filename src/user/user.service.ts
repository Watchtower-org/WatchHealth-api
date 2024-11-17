import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
    constructor(
        private prismaService: PrismaService,
        private emailService: EmailService
    ) { }    

    async createUser(createUserDto: CreateUserDTO) {
        console.log('Dados recebidos:', createUserDto);
    
        try {
            const user = await this.prismaService.user.create({
                data: {
                    ...createUserDto,
                    law: createUserDto.law || false,         
                    bidding: createUserDto.bidding || false, 
                    news: createUserDto.news || false,       
                    covid: createUserDto.covid || false,     
                    dengue: createUserDto.dengue || false,   
                },
            });

            this.emailService.sendEmailWelcome(user.email, user.name);
    
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
    
    
    
    async findAll() {
        try {
            const users = await this.prismaService.user.findMany();
            return users;
        } catch (error) {
            console.error('Erro ao buscar os usuários:', error);
            throw error;
        }
    }
    
    async findManyByDengue() {
        try {
            const users = await this.prismaService.user.findMany({
                where: {
                    dengue: true,
                },
            });
    
            console.log('Usuários encontrados:', users);
            return users;
        } catch (error) {
            console.error('Erro ao buscar os usuários:', error);
            throw error;
        }
    }
    
    
    async findManyByCovid() {
        try {
            const users = await this.prismaService.user.findMany({
                where: {
                    covid: true, 
                },
            });

            return users;
        } catch (error) {
            console.error('Erro ao buscar os usuários:', error);
            throw error;
        }
    }
    
    
    async findManyByLaws() {
        try {
            const users = await this.prismaService.user.findMany({
                where: {
                    law: true,
                },
            });

            return users;
        } catch (error) {
            console.error('Erro ao buscar os usuários:', error);
            throw error;
        }
    }



    

}
