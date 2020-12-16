import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

import { PasswordHasherService } from 'src/password-hasher/password-hasher.service';
import { UsersService } from 'src/users/users.service';
import { SignUpCredentials } from './interfaces/signup-credentials.interface';
import { VerifyCredentials } from './interfaces/verify-credentials.interface';
import { UserEntity } from 'src/entities/user.entity';
import { JWTService } from 'src/tokens/jwt/jwt.service';

@Injectable()
export class AuthService {
    constructor(
        private passwordHasherService: PasswordHasherService,
        private usersService: UsersService,
        private jwtService: JWTService,
    ) {}

    async signUp(credentials: SignUpCredentials): Promise<UserEntity> {
        const [hash, salt] = await this.passwordHasherService.hashPassword(
            credentials.password,
        );

        const preparedCredentials: Omit<UserEntity, 'id' | 'refreshTokens'> = {
            ...credentials,
            hash,
            salt,
        };

        return await this.usersService.create(preparedCredentials);
    }

    async verifyCredentials(
        credentials: VerifyCredentials,
    ): Promise<[string, UserEntity]> {
        const user = await this.usersService.findOneByEmail(credentials.email);

        if (!user) {
            throw new NotFoundException(
                'There are not registered users with this email!',
            );
        }

        const passwordMatches = await this.passwordHasherService.comparePasswords(
            {
                storedPass: user.hash,
                providedPass: credentials.password,
                salt: user.salt,
            },
        );

        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid password!');
        }

        const token = await this.jwtService.sign(user);

        return [token, user];
    }
}
