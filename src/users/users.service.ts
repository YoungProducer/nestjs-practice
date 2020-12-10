import { Injectable } from '@nestjs/common';

import { User } from './interfaces/user.interface';
import { CreateUser } from './interfaces/create.interface';

@Injectable()
export class UsersService {
    private newId = 0;
    private readonly users: User[] = [];

    async create(user: CreateUser): Promise<User> {
        const newUser: User = {
            ...user,
            id: this.newId++,
        };

        this.users.push(newUser);

        return newUser;
    }

    async findAll(): Promise<User[]> {
        return this.users;
    }

    async findOne(id: number): Promise<User | undefined> {
        return this.users.find(user => user.id === id);
    }

    async findOneByName(name: string): Promise<User | undefined> {
        return this.users.find(user => user.name === name);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
}
