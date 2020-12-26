import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { HttpLoggingInterceptor } from './lib/interceptors/logging/http-logging.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
        },
    });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new HttpLoggingInterceptor());
    await app.listen(3000);
    console.log(`Server started on ${await app.getUrl()}`);
}
bootstrap();
