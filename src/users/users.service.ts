import { Injectable } from '@nestjs/common';

import { User } from './interfaces/user.interface';
import { FindOneData } from './interfaces/find-one.interface';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    async create(user: User): Promise<void> {
       this.users.push(user);
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findOne(data: FindOneData): Promise<User | undefined> {
        if (!data.email && !data.name) return undefined;

        return this.users.find(user =>
            user.email === data.email ||
            user.name === data.name);
    }
}
