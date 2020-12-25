import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { RefreshTokenEntity } from 'src/domain/tokens/entities/refresh-token.entity';
import { UserDto } from 'src/domain/users/dto';
import { JWTService } from './jwt/jwt.service';
import { RefreshService } from './refresh/refresh.service';
import { SignOptions } from './jwt/interfaces';
import { DI_CONFIG } from '../../config/constants';
import { EnvConfig } from '../../config/interfaces';

@Injectable()
export class TokensService {
    constructor(
        @Inject(DI_CONFIG)
        private config: EnvConfig,

        private jwtService: JWTService,

        private refreshService: RefreshService,

        @InjectRepository(RefreshTokenEntity)
        private refreshTokensRepository: Repository<RefreshTokenEntity>,
    ) {}

    async issueTokensPair(user: UserDto): Promise<[string, string]> {
        const options: SignOptions = {
            secret: this.config.JWT_SECRET,
            expiresIn: this.config.JWT_EXPIRES_IN,
        };

        const accessToken = await this.jwtService.sign(user, options);
        const refreshToken = await this.refreshService.create(user.id);

        return [`Bearer ${accessToken}`, refreshToken];
    }

    async refresh(token: string): Promise<[string, string]> {
        const tokenEntity = await this.refreshService.validate(token);

        const user = await Promise.resolve(tokenEntity.user);

        await this.refreshTokensRepository.remove(tokenEntity);

        return await this.issueTokensPair(classToPlain(user) as UserDto);
    }
}
