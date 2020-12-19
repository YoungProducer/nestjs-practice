import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { TokensModule } from 'src/tokens/tokens.module';
import { PredefinedMailerModule } from 'src/predefined/modules/mailer.module';
import { PredefinedConfigModule } from 'src/predefined/modules/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmationTokenEntity } from 'src/entities/confirmation-token.entity';

@Module({
    imports: [
        UsersModule,
        PasswordHasherModule,
        PassportModule,
        TokensModule,
        PredefinedMailerModule,
        PredefinedConfigModule,
        TypeOrmModule.forFeature([ConfirmationTokenEntity]),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
