import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordHasherModule } from './password-hasher/password-hasher.module';
import { PredefinedConfigModule } from './predefined/modules';
import { MockedUsersModule } from './__mocks__/modules/users.module.mock';
import { MockedAuthModule } from './__mocks__/modules/auth.module.mock';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [
                MockedUsersModule,
                MockedAuthModule,
                PasswordHasherModule,
                PredefinedConfigModule,
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
