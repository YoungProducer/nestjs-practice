import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokenEntity } from 'src/entities/refresh-token.entity';
import { UserEntity } from 'src/entities/user.entity';
import { b64DecodeUnicode, b64EncodeUnicode } from 'src/utils';
import { RefreshTokenCreateOutputInterface } from './interfaces/refres-token-create-output.interface';

@Injectable()
export class RefreshService {
    constructor(
        @InjectRepository(RefreshTokenEntity)
        private refreshTokensRepository: Repository<RefreshTokenEntity>,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async create(userId: number): Promise<RefreshTokenCreateOutputInterface> {
        const core = randomStringGenerator();

        const user = await this.usersRepository.findOne(userId, {
            relations: ['refreshTokens'],
        });

        if (!user) {
            throw new UnauthorizedException('User not found!');
        }

        const entity = this.refreshTokensRepository.create({
            token: core,
        });

        entity.user = Promise.resolve(user);

        await this.refreshTokensRepository.save(entity);

        const id = entity.id;

        const token = `${core}.${b64EncodeUnicode(id)}`;

        return {
            dbTokenValue: core,
            tokenForRespond: token,
        };
    }

    /**
     * return token's id in db;
     */
    async validate(token: string): Promise<string> {
        const parts = token.split('.');

        if (parts.length !== 2) {
            throw new UnauthorizedException('Invalid token type!');
        }

        const [core, b64Id] = parts;

        const id = b64DecodeUnicode(b64Id);

        const tokenEntity = await this.refreshTokensRepository.findOne(id);

        if (!tokenEntity) {
            throw new UnauthorizedException('Token is invalid!');
        }

        if (tokenEntity.token !== core) {
            throw new UnauthorizedException('Token is invalid!');
        }

        return id;
    }
}
