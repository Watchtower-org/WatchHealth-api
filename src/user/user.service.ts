import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UserService {
    createUser(body: CreateUserDTO) {
        throw new Error('Method not implemented.');
    }
}
