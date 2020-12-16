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
import { TokensModule } from './tokens/tokens.module';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        PasswordHasherModule,
        PredefinedConfigModule,
        TokensModule,
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
