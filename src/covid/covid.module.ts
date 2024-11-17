import { Module } from '@nestjs/common';
import { CovidController } from './covid.controller';
import { CovidService } from './covid.service';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [CovidController],
  providers: [CovidService,EmailService,UserService,PrismaService],
  imports: [HttpModule],

})
export class CovidModule {}
