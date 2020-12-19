import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordHasherModule } from './password-hasher/password-hasher.module';
import { PredefinedConfigModule } from './predefined/modules/config.module';
import { MockedUsersModule } from './__mocks__/modules/users.module.mock';
import { MockedAuthModule } from './__mocks__/modules/auth.module.mock';
import { TokensModule } from './tokens/tokens.module';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                MockedUsersModule,
                MockedAuthModule,
                PasswordHasherModule,
                PredefinedConfigModule,
                TokensModule,
            ],
            controllers: [AppController],
            providers: [AppService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getHello()).toEqual({ text: 'Hello World!' });
        });
    });
});
