import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { RefreshTokenEntity } from 'src/entities/refresh-token.entity';
import { UserDto } from 'src/users/dto/user.dto';
import { JWTService } from './jwt/jwt.service';
import { RefreshService } from './refresh/refresh.service';

@Injectable()
export class TokensService {
    constructor(
        private jwtService: JWTService,
        private refreshService: RefreshService,
        @InjectRepository(RefreshTokenEntity)
        private refreshTokensRepository: Repository<RefreshTokenEntity>,
    ) {}

    async issueTokensPair(user: UserDto): Promise<[string, string]> {
        const accessToken = await this.jwtService.sign(user);
        const refreshToken = await this.refreshService.create(user.id);

        return [accessToken, refreshToken];
    }

    async refresh(token: string): Promise<[string, string]> {
        const tokenEntity = await this.refreshService.validate(token);

        const user = await Promise.resolve(tokenEntity.user);

        await this.refreshTokensRepository.remove(tokenEntity);

        return await this.issueTokensPair(classToPlain(user) as UserDto);
    }
}
