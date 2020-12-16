import { Injectable } from '@nestjs/common';

import { ConfigService } from 'src/config/config.service';
import { sign, verify } from './helpers';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class JWTService {
    constructor(private configService: ConfigService) {}

    async sign(user: UserDto): Promise<string> {
        const secret = this.configService.get('JWT_SECRET');
        const expiresIn = this.configService.get('JWT_EXPIRES_IN');

        const token = await sign(user, secret, {
            expiresIn,
        });

        return `Bearer ${token}`;
    }

    async verify(token: string): Promise<UserDto> {
        const secret = this.configService.get('JWT_SECRET');
        const data = await verify(token, secret);

        return classToPlain(plainToClass(UserDto, data)) as UserDto;
    }
}
