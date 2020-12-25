import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from 'src/domain/users/users.module';
import { TokensModule } from 'src/domain/tokens/tokens.module';
import { PredefinedConfigModule } from 'src/config/config.module';
import { ConfirmationTokenEntity } from 'src/domain/users/entities/confirmation-token.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UsersModule,
        TokensModule,
        PredefinedConfigModule,
        TypeOrmModule.forFeature([ConfirmationTokenEntity]),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
