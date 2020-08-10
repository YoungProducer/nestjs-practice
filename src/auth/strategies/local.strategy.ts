import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { UserProfile } from 'src/users/interfaces/user-profile.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, name: string, password: string): Promise<UserProfile> {
        console.log('here');
        return await this.authService.verifyCredentials({
            name,
            email,
            password,
        });
    }
}