/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';

import { UserDto } from 'src/domain/users/dto';
import { sign, verify } from './helpers';
import { SignOptions } from './interfaces';

@Injectable()
export class JWTService {
    async sign<T extends string | object | Buffer = UserDto>(
        data: T,
        { expiresIn, secret }: SignOptions,
    ): Promise<string> {
        const token = await sign(data, secret, {
            expiresIn,
        });

        return token;
    }

    async verify<T = UserDto>(token: string, secret: string): Promise<T> {
        const data = await verify<T>(token, secret);

        return data;
    }
}
