import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';
import { MockedUsersModule } from 'src/__mocks__/modules/users.module.mock';
import { TokensModule } from 'src/tokens/tokens.module';

describe('Auth Controller', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            imports: [
                MockedUsersModule,
                PasswordHasherModule,
                PassportModule,
                TokensModule,
            ],
            providers: [AuthService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
