import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';
import { MockedUsersModule } from './users.module.mock';

@Module({
    imports: [MockedUsersModule, PasswordHasherModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class MockedAuthModule {}
