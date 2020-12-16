import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getTypeOrmOptions } from 'src/utils';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config/config.service';
import { PasswordHasherModule } from './password-hasher/password-hasher.module';
import { PredefinedConfigModule } from './predefined/modules';
import { JWTModule } from './tokens/jwt/jwt.module';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        PasswordHasherModule,
        PredefinedConfigModule,
        JWTModule,
        TypeOrmModule.forRootAsync({
            imports: [PredefinedConfigModule],
            useFactory: getTypeOrmOptions,
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
