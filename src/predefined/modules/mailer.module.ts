import * as path from 'path';
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { ConfigService } from 'src/config/config.service';
import { PredefinedConfigModule } from './config.module';

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [PredefinedConfigModule],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get('SMTP_HOST'),
                    port: +configService.get('SMTP_PASS'),
                    auth: {
                        user: configService.get('SMTP_USER'),
                        pass: configService.get('SMTP_PASS'),
                    },
                },
                defaults: {
                    from: 'noreply@gmail.com',
                },
                template: {
                    dir: path.join(__dirname, '../../', 'templates'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [MailerModule],
})
export class PredefinedMailerModule {}
