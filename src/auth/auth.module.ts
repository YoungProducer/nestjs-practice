import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [UsersService],
})
export class AuthModule {}
