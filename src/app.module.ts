import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PasswordHasherModule } from './password-hasher/password-hasher.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PasswordHasherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
