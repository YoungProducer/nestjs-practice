import {
    CanActivate,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { Request as Req } from 'express';

import { DI_CONFIG } from 'src/config/constants';
import { EnvConfig } from 'src/config/interfaces';
import { JWTService } from 'src/domain/tokens/jwt/jwt.service';
import { UserDto } from 'src/domain/users/dto';

@Injectable()
export class JWTGuard implements CanActivate {
    constructor(
        private jwtService: JWTService,

        @Inject(DI_CONFIG)
        private readonly config: EnvConfig,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Req>();

        return await this.validate(request);
    }

    async extractToken(req: Req): Promise<string> {
        const headers = req.headers;
        const tokenString = headers.authorization;

        if (!tokenString) {
            throw new UnauthorizedException('Access token not found!');
        }

        if (!tokenString.startsWith('Bearer ')) {
            throw new UnauthorizedException('Invalid token type!');
        }

        /** Remove 'Bearer ' from token */
        const token = tokenString.slice('Bearer '.length);

        if (token.split('.').length !== 3) {
            throw new UnauthorizedException('Token is not of type JWT');
        }

        return token;
    }

    async validate(req: Req): Promise<boolean> {
        const token = await this.extractToken(req);

        const data = await this.jwtService.verify(
            token,
            this.config.JWT_SECRET,
        );

        const user = classToPlain(plainToClass(UserDto, data));

        req.user = user;

        return !!data;
    }
}
