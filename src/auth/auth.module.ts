import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, PasswordHasherModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
