import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { PasswordHasherModule } from './password-hasher/password-hasher.module';

const typeOrmOptions = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: configService.get('DB_TYPE') as any,
    host: configService.get('DB_HOST'),
    port: +configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: process.env.NODE_ENV === 'development',
});

@Module({
    imports: [
        UsersModule,
        AuthModule,
        PasswordHasherModule,
        ConfigModule.register({ folder: './config' }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.register({ folder: './config' })],
            useFactory: typeOrmOptions,
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
