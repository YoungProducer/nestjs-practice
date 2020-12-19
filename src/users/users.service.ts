import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { CreateUserData } from './interfaces/create-data.interface';
import { VerifyDto } from './dto';
import { JWTService } from 'src/tokens/jwt/jwt.service';
import { ConfigService } from 'src/config/config.service';
import { JWTServiceVerifyResponseInterface } from './interfaces';

@Injectable()
export class UsersService {
    constructor(
        private configService: ConfigService,

        private jwtService: JWTService,

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

    async verify({ token }: VerifyDto): Promise<void> {
        const { email } = await this.jwtService.verify<
            JWTServiceVerifyResponseInterface
        >(token, this.configService.get('VERIFY_SECRET'));

        const user = await this.findOneByEmail(email);

        if (!user) {
            throw new NotFoundException(
                'User with this email is not registered!',
            );
        }

        user.verified = true;

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
