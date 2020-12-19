import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { PasswordHasherService } from 'src/password-hasher/password-hasher.service';
import { UsersService } from 'src/users/users.service';
import { SignUpCredentials } from './interfaces/signup-credentials.interface';
import { VerifyCredentials } from './interfaces/verify-credentials.interface';
import { UserEntity } from 'src/entities/user.entity';
import { JWTService } from 'src/tokens/jwt/jwt.service';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JWTService,

        private configService: ConfigService,

        private passwordHasherService: PasswordHasherService,

        private usersService: UsersService,

        private mailerService: MailerService,
    ) {}

    async signUp(credentials: SignUpCredentials): Promise<UserEntity> {
        const [hash, salt] = await this.passwordHasherService.hashPassword(
            credentials.password,
        );

        const preparedCredentials: Omit<
            UserEntity,
            'id' | 'refreshTokens' | 'verified'
        > = {
            ...credentials,
            hash,
            salt,
        };

        const user = await this.usersService.create(preparedCredentials);

        const confirmationToken = await this.jwtService.sign(
            {
                email: user.email,
            },
            {
                secret: this.configService.get('VERIFY_SECRET'),
                expiresIn: this.configService.get('VERIFY_EXPIRES_IN'),
            },
        );

        await this.mailerService.sendMail({
            to: 'sashabezrukovownmail@gmail.com',
            template: 'complete-registration',
            subject: 'Complete registration in our service!',
            context: {
                /** Это дело надо уже с фронтами синхронизировать */
                link: 'like a link',
                token: confirmationToken,
            },
        });

        return user;
    }

    async verifyCredentials(
        credentials: VerifyCredentials,
    ): Promise<UserEntity> {
        const user = await this.usersService.findOneByEmail(credentials.email);

        if (!user) {
            throw new NotFoundException(
                'There are not registered users with this email!',
            );
        }

        if (!user.verified) {
            throw new UnauthorizedException(
                'You did not verify your email. Please, check your inbox!',
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

        return user;
    }
}
