import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './domain/users/users.module';
import { AuthModule } from './domain/auth/auth.module';
import { TokensModule } from './domain/tokens/tokens.module';
import { DI_CONFIG } from './config/constants';
import { EnvConfig } from './config/interfaces';
import { PredefinedConfigModule } from './config/config.module';
import { DataBaseModule } from './infrastructure/database/database.module';

@Module({
    imports: [
        UsersModule,
        AuthModule,
        PredefinedConfigModule,
        TokensModule,
        DataBaseModule,
        MailerModule.forRootAsync({
            imports: [PredefinedConfigModule],
            useFactory: (config: EnvConfig) => ({
                transport: {
                    host: config.SMTP_HOST,
                    port: +config.SMTP_PASS,
                    auth: {
                        user: config.SMTP_USER,
                        pass: config.SMTP_PASS,
                    },
                },
                defaults: {
                    from: 'noreply@gmail.com',
                },
                template: {
                    dir: path.join(__dirname, 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [DI_CONFIG],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
