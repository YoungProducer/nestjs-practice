import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { ConfirmationTokenEntity } from 'src/entities/confirmation-token.entity';
import { CreateUserData } from './interfaces/create-data.interface';
import { VerifyDto } from './dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,

        @InjectRepository(ConfirmationTokenEntity)
        private confirmationTokensRepository: Repository<
            ConfirmationTokenEntity
        >,
    ) {}

    async create(user: CreateUserData): Promise<UserEntity> {
        const newUser = this.usersRepository.create({
            ...user,
        });

        await this.usersRepository.save(newUser);

        return newUser;
    }

    async verify({ token }: VerifyDto): Promise<void> {
        const tokenEntity = await this.confirmationTokensRepository.findOne({
            where: {
                token,
            },
            relations: ['user'],
        });

        if (!token) {
            throw new NotFoundException('Token is invalid!');
        }

        const user = await tokenEntity.user;

        if (!user) {
            throw new NotFoundException(
                'User with this email is not registered!',
            );
        }

        user.verified = true;

        await this.confirmationTokensRepository.remove(tokenEntity);
        await this.usersRepository.save(user);
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
