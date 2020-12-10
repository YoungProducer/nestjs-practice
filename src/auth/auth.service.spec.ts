import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UsersModule, PasswordHasherModule],
            providers: [AuthService],
        }).compile();

        service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
