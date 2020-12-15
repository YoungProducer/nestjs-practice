import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/entities/user.entity';
import { ConfigService } from 'src/config/config.service';
import { sign, verify } from './helpers';
import { classToPlain, plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class JWTService {
    constructor(private configService: ConfigService) {}

    async sign(user: UserEntity): Promise<string> {
        const userDto = plainToClass(UserDto, user);

        const secret = this.configService.get('JWT_SECRET');
        const expiresIn = this.configService.get('JWT_EXPIRES_IN');

        const token = await sign(classToPlain(userDto), secret, {
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
