import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { User } from './interfaces/user.interface';
import { CreateUserData } from './interfaces/create-data.interface';

@Injectable()
export class UsersService {
    private newId = 0;
    private readonly users: User[] = [];

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async create(user: CreateUserData): Promise<UserEntity> {
        const newUser = this.usersRepository.create({
            ...user,
        });

        await this.usersRepository.save(newUser);

        return newUser;
    }

    async findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<UserEntity | undefined> {
        return await this.usersRepository.findOne({
            where: {
                id,
            },
        });
    }

    async findOneByName(name: string): Promise<UserEntity | undefined> {
        return await this.usersRepository.findOne({
            where: {
                name,
            },
        });
    }

    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return await this.usersRepository.findOne({
            where: {
                email,
            },
        });
    }
}
