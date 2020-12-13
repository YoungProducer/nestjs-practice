import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { PasswordHasherModule } from 'src/password-hasher/password-hasher.module';
import { PasswordHasherService } from 'src/password-hasher/password-hasher.service';
import { MockedUsersModule } from 'src/__mocks__/modules/users.module.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let hasherService: PasswordHasherService;
    let repo: Repository<UserEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MockedUsersModule, PasswordHasherModule],
            providers: [AuthService],
        }).compile();

        service = module.get<AuthService>(AuthService);
        hasherService = module.get<PasswordHasherService>(
            PasswordHasherService,
        );
        repo = module.get<Repository<UserEntity>>(
            getRepositoryToken(UserEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(hasherService).toBeDefined();
        expect(repo).toBeDefined();
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
        };

        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(user);

        expect(
            await service.verifyCredentials({
                password,
                email,
            }),
        ).toEqual(user);
    });
});
