import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import { PasswordHasherService } from 'src/password-hasher/password-hasher.service';
import { UsersService } from 'src/users/users.service';
import { SignUpCredentials } from './interfaces/signup-credentials.interface';
import { VerifyCredentials } from './interfaces/verify-credentials.interface';
import { UserProfile } from 'src/users/interfaces/user-profile.interface';

@Injectable()
export class AuthService {
    constructor(
        private passwordHasherService: PasswordHasherService,
        private usersService: UsersService,
    ) {}

    async signUp(credentials: SignUpCredentials): Promise<void> {
        const password = await this.passwordHasherService.hashPassword(
            credentials.password,
        );

        const preparedCredentials: SignUpCredentials = {
            ...credentials,
            password,
        };

        await this.usersService.create(preparedCredentials);
    }

    async verifyCredentials(
        credentials: VerifyCredentials,
    ): Promise<UserProfile> {
        const user = await this.usersService.findOneByEmail(credentials.email);

        if (!user) {
            throw new NotFoundException(
                'There are not registered users with this email or name!',
            );
        }

        const passwordMatches = await this.passwordHasherService.comparePasswords(
            {
                providedPass: credentials.password,
                storedPass: user.password,
            },
        );

        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid password!');
        }

        delete user.password;

        return user;
    }
}
