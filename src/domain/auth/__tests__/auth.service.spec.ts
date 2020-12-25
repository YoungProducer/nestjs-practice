import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MockedUsersModule } from 'src/__mocks__/modules/users.module.mock';
import { MockedTokensModule } from 'src/__mocks__/modules/tokens.module.mock';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { AuthService } from '../auth.service';
import { hashPassword } from 'src/lib/password-hasher';

describe('AuthService', () => {
    let service: AuthService;
    let repo: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MockedUsersModule, MockedTokensModule],
            providers: [AuthService],
        }).compile();

        service = module.get<AuthService>(AuthService);
        repo = module.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repo).toBeDefined();
    });

    it('should return user if all credential are valid', async () => {
        const password = '1234';
        const email = 'mock@gmail.com';

        const [hash, salt] = await hashPassword(password);

        const user: UserEntity = {
            id: 1,
            email,
            name: 'name',
            hash,
            salt,
            refreshTokens: Promise.resolve([]),
        };

        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(user);

        const result = await service.verifyCredentials({
            password,
            email,
        });

        expect(result).toEqual(user);
    });

    it('should throw error if email is incorrect', async () => {
        const password = '1234';

        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(undefined);

        try {
            await service.verifyCredentials({
                password,
                email: 'invalid',
            });
        } catch (e) {
            expect(e.message).toBe(
                'There are not registered users with this email!',
            );
        }
    });

    it('should throw error if password is incorrect', async () => {
        const password = '1234';
        const email = 'mock@gmail.com';

        const [hash, salt] = await hashPassword(password);

        const user: UserEntity = {
            id: 1,
            email,
            name: 'name',
            hash,
            salt,
            refreshTokens: Promise.resolve([]),
        };

        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(user);

        try {
            await service.verifyCredentials({
                password: 'wrong pass',
                email,
            });
        } catch (e) {
            expect(e.message).toBe('Invalid password!');
        }
    });
});
