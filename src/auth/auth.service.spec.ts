import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MockedUsersModule } from 'src/__mocks__/modules/users.module.mock';
import { getConfigValue } from 'src/__mocks__/getConfigValue.mock';
import { MockedTokensModule } from 'src/__mocks__/modules/tokens.module.mock';
import { UserEntity } from 'src/entities/user.entity';
import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';
import { PasswordHasherService } from 'src/password-hasher/password-hasher.service';
import { ConfigService } from 'src/config/config.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let hasherService: PasswordHasherService;
    let repo: Repository<UserEntity>;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                MockedUsersModule,
                PasswordHasherModule,
                MockedTokensModule,
            ],
            providers: [AuthService],
        }).compile();

        service = module.get<AuthService>(AuthService);
        hasherService = module.get<PasswordHasherService>(
            PasswordHasherService,
        );
        repo = module.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        );
        configService = module.get<ConfigService>(ConfigService);

        jest.spyOn(configService, 'get').mockImplementation(getConfigValue);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(hasherService).toBeDefined();
        expect(repo).toBeDefined();
        expect(configService).toBeDefined();
    });

    it('should return user if all credential are valid', async () => {
        const password = '1234';
        const email = 'mock@gmail.com';

        const [hash, salt] = await hasherService.hashPassword(password);

        const user: UserEntity = {
            id: 1,
            email,
            name: 'name',
            hash,
            salt,
            refreshTokens: [],
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

        const [hash, salt] = await hasherService.hashPassword(password);

        const user: UserEntity = {
            id: 1,
            email,
            name: 'name',
            hash,
            salt,
            refreshTokens: [],
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
