import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokenEntity } from 'src/entities/refres-token.entity';
import { UserEntity } from 'src/entities/user.entity';
import { b64DecodeUnicode, b64EncodeUnicode } from 'src/utils';

@Injectable()
export class RefreshService {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private refreshTokensRepository: Repository<RefreshTokenEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async create(userId: number): Promise<string> {
        const core = randomStringGenerator();

        const user = await this.usersRepository.findOne(userId, {
            relations: ['refreshTokens'],
        });

        if (!user) {
            throw new UnauthorizedException('User not found!');
        }

        const entity = this.refreshTokensRepository.create({
            user,
            token: core,
        });

        user.refreshTokens = [...user.refreshTokens, entity];

        await this.usersRepository.save(user);

        const id = entity.id;

        const token = `${core}.${b64EncodeUnicode(id)}`;

        return token;
    }

    /**
     * return token's id in db;
     */
    async validate(token: string): Promise<string> {
        const parts = token.split('.');

        if (parts.length !== 2) {
            throw new UnauthorizedException('Invalid token type!');
        }

        const [, b64Id] = parts;

        const id = b64DecodeUnicode(b64Id);

        if (!this.refreshTokensRepository.findOne(id)) {
            throw new UnauthorizedException('Token is invalid!');
        }

        return id;
    }
}
