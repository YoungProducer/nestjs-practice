import { Injectable } from '@nestjs/common';

import { User } from './interfaces/user.interface';
import { FindOne } from './interfaces/find-one.interface';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    async create(user: User): Promise<void> {
       this.users.push(user);
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findOne(foundUser: FindOne): Promise<User | undefined> {
        if (!foundUser.email && !foundUser.name) return undefined;

        return this.users.find(user =>
            user.email === foundUser.email ||
            user.name === foundUser.name);
    }
}
