import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokenEntity } from 'src/entities/refresh-token.entity';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class RefreshService {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private refreshTokensRepository: Repository<RefreshTokenEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async create(userId: number): Promise<string> {
        const token = randomStringGenerator();

        const user = await this.usersRepository.findOne(userId, {
            relations: ['refreshTokens'],
        });

        if (!user) {
            throw new UnauthorizedException('User not found!');
        }

        const entity = this.refreshTokensRepository.create({
            token,
        });

        entity.user = Promise.resolve(user);

        await this.refreshTokensRepository.save(entity);

        return token;
    }

    /**
     * return token's id in db;
     */
    async validate(token: string): Promise<RefreshTokenEntity> {
        const tokenEntity = await this.refreshTokensRepository.findOne({
            where: {
                token,
            },
        });

        if (!tokenEntity) {
            throw new UnauthorizedException('Token is invalid!');
        }

        return tokenEntity;
    }
}
