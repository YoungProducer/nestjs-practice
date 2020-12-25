import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { Repository } from 'typeorm';

import { UsersService } from 'src/domain/users/users.service';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { ConfirmationTokenEntity } from 'src/domain/users/entities/confirmation-token.entity';
import { CreateUserData } from 'src/domain/users/interfaces';
import { comparePasswords, hashPassword } from 'src/lib/password-hasher';
import { SignUpCredentials } from './interfaces/signup-credentials.interface';
import { VerifyCredentials } from './interfaces/verify-credentials.interface';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,

        private mailerService: MailerService,

        @InjectRepository(ConfirmationTokenEntity)
        private confirmationTokensRepository: Repository<
            ConfirmationTokenEntity
        >,
    ) {}

    async signUp(credentials: SignUpCredentials): Promise<UserEntity> {
        const [hash, salt] = await hashPassword(credentials.password);

        const preparedCredentials: CreateUserData = {
            ...credentials,
            hash,
            salt,
        };

        const user = await this.usersService.create(preparedCredentials);

        const confirmationToken: string = randomStringGenerator();

        const confirmationTokenEntity = this.confirmationTokensRepository.create(
            {
                token: confirmationToken,
                expirationDate: (Date.now() + 60 * 60 * 1000).toString(),
            },
        );

        confirmationTokenEntity.user = Promise.resolve(user);

        await this.confirmationTokensRepository.save(confirmationTokenEntity);

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

        const passwordMatches = await comparePasswords({
            storedPass: user.hash,
            providedPass: credentials.password,
            salt: user.salt,
        });

        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid password!');
        }

        return user;
    }
}
