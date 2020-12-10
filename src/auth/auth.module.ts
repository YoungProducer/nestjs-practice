import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    imports: [UsersModule, PasswordHasherModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
