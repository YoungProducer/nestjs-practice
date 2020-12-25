import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { MockedUsersModule } from 'src/__mocks__/modules/users.module.mock';
import { TokensModule } from 'src/domain/tokens/tokens.module';

describe('Auth Controller', () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            imports: [MockedUsersModule, PassportModule, TokensModule],
            providers: [AuthService],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
