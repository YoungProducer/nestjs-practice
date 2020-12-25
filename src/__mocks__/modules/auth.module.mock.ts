import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from 'src/domain/auth/auth.controller';
import { AuthService } from 'src/domain/auth/auth.service';
import { LocalStrategy } from 'src/domain/auth/strategies/local.strategy';
import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';
import { TokensModule } from 'src/domain/tokens/tokens.module';
import { MockedUsersModule } from './users.module.mock';

@Module({
    imports: [
        MockedUsersModule,
        PasswordHasherModule,
        PassportModule,
        TokensModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class MockedAuthModule {}
