import { Test, TestingModule } from '@nestjs/testing';

import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';
import { MockedUsersModule } from 'src/__mocks__/modules/users.module.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MockedUsersModule, PasswordHasherModule],
            providers: [AuthService],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
