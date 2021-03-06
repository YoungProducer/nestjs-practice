import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpLoggingInterceptor } from './lib/interceptors/logging/http-logging.interceptor';
import { AllExceptionFilter } from './lib/exception-filters/all-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['log', 'debug', 'verbose', 'warn'],
        cors: {
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
            optionsSuccessStatus: 204,
        },
    });

    const options = new DocumentBuilder()
        .setTitle('Auth service')
        .setVersion('1.0')
        .addTag('Pet')
        .build();

    const document = SwaggerModule.createDocument(app, options);

    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new HttpLoggingInterceptor());
    app.useGlobalFilters(new AllExceptionFilter());

    SwaggerModule.setup('api', app, document);

    await app.listen(3000);

    console.log(`Server started on ${await app.getUrl()}`);
}
bootstrap();
