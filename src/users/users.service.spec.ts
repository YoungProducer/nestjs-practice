import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository, SaveOptions } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
    let service: UsersService;
    let repo: Repository<UserEntity>;

    beforeEach(async () => {
        const repositoryToken = getRepositoryToken(UserEntity);

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: repositoryToken,
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        repo = module.get<Repository<UserEntity>>(repositoryToken);

        jest.spyOn(repo, 'save').mockImplementation(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async (e: DeepPartial<UserEntity>, _o?: SaveOptions) =>
                e as UserEntity,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create correct user', async () => {
        const USER_DATA = {
            email: 'user-email',
            name: 'user-name',
            password: 'user-pass',
        };

        const RETURN_VALUE = {
            ...USER_DATA,
            id: 1,
            hash: 'hash',
            salt: 'salt',
            refreshTokens: Promise.resolve([]),
        };

        jest.spyOn(repo, 'create').mockReturnValueOnce(RETURN_VALUE);
        jest.spyOn(repo, 'findOne').mockResolvedValue(RETURN_VALUE);

        await service.create(USER_DATA);

        const foundUser = await service.findOneByEmail(USER_DATA.email);

        expect(foundUser).toEqual(expect.objectContaining(USER_DATA));
    });

    it('should find correct user by id', async () => {
        const USER_1_DATA = {
            email: 'user-1-email',
            name: 'user-name',
            password: 'user-pass',
        };

        const USER_2_DATA = {
            email: 'user-2-email',
            name: 'user-name',
            password: 'user-pass',
        };

        const RETURN_VALUE = {
            ...USER_1_DATA,
            id: 1,
            hash: 'hash',
            salt: 'salt',
            refreshTokens: Promise.resolve([]),
        };

        jest.spyOn(repo, 'create').mockReturnValue(RETURN_VALUE);
        jest.spyOn(repo, 'findOne').mockResolvedValue(RETURN_VALUE);

        const userToFind = await service.create(USER_1_DATA);
        await service.create(USER_2_DATA);

        const foundUser = await service.findOne(userToFind.id);

        expect(foundUser).toEqual(userToFind);
    });

    it('should find correct user by email', async () => {
        const USER_1_DATA = {
            email: 'user-1-email',
            name: 'user-name',
            password: 'user-pass',
        };

        const USER_2_DATA = {
            email: 'user-2-email',
            name: 'user-name',
            password: 'user-pass',
        };

        const RETURN_VALUE = {
            ...USER_1_DATA,
            id: 1,
            hash: 'hash',
            salt: 'salt',
            refreshTokens: Promise.resolve([]),
        };

        jest.spyOn(repo, 'create').mockReturnValue(RETURN_VALUE);
        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(RETURN_VALUE);

        await service.create(USER_1_DATA);
        await service.create(USER_2_DATA);

        const foundUser = await service.findOneByEmail(USER_1_DATA.email);

        expect(foundUser).toEqual(expect.objectContaining(USER_1_DATA));
    });

    it('should find correct user by name', async () => {
        const USER_1_DATA = {
            email: 'user-1-email',
            name: 'user-1-name',
            password: 'user-pass',
        };

        const USER_2_DATA = {
            email: 'user-2-email',
            name: 'user-2-name',
            password: 'user-pass',
        };

        const RETURN_VALUE = {
            ...USER_2_DATA,
            id: 1,
            hash: 'hash',
            salt: 'salt',
            refreshTokens: Promise.resolve([]),
        };

        jest.spyOn(repo, 'create').mockReturnValue(RETURN_VALUE);
        jest.spyOn(repo, 'findOne').mockResolvedValueOnce(RETURN_VALUE);

        await service.create(USER_1_DATA);
        await service.create(USER_2_DATA);

        const foundUser = await service.findOneByName(USER_2_DATA.name);

        expect(foundUser).toEqual(expect.objectContaining(USER_2_DATA));
    });

    it('should return all created users', async () => {
        const USER_1_DATA = {
            email: 'user-1-email',
            name: 'user-1-name',
            password: 'user-pass',
        };

        const USER_2_DATA = {
            email: 'user-2-email',
            name: 'user-2-name',
            password: 'user-pass',
        };

        const FIND_ALL_RETURNED_VALUE = [
            {
                ...USER_1_DATA,
                id: 1,
                hash: 'hash',
                salt: 'salt',
                refreshTokens: Promise.resolve([]),
            },
            {
                ...USER_2_DATA,
                id: 1,
                hash: 'hash',
                salt: 'salt',
                refreshTokens: Promise.resolve([]),
            },
        ];

        jest.spyOn(repo, 'create').mockReturnValueOnce(
            FIND_ALL_RETURNED_VALUE[0],
        );
        await service.create(USER_1_DATA);

        jest.spyOn(repo, 'create').mockReturnValueOnce(
            FIND_ALL_RETURNED_VALUE[1],
        );
        await service.create(USER_2_DATA);

        jest.spyOn(repo, 'find').mockResolvedValueOnce(FIND_ALL_RETURNED_VALUE);
        const foundUsers = await service.findAll();

        expect(foundUsers).toHaveLength(2);

        expect(foundUsers).toContainEqual(expect.objectContaining(USER_1_DATA));
        expect(foundUsers).toContainEqual(expect.objectContaining(USER_2_DATA));
    });

    it('should each new user has unique index', async () => {
        const USER_1_DATA = {
            email: 'user-1-email',
            name: 'user-1-name',
            password: 'user-pass',
        };

        const RETURN_DATA = [
            {
                ...USER_1_DATA,
                id: 1,
                hash: 'hash',
                salt: 'salt',
                refreshTokens: Promise.resolve([]),
            },
            {
                ...USER_1_DATA,
                id: 2,
                hash: 'hash',
                salt: 'salt',
                refreshTokens: Promise.resolve([]),
            },
            {
                ...USER_1_DATA,
                id: 3,
                hash: 'hash',
                salt: 'salt',
                refreshTokens: Promise.resolve([]),
            },
            {
                ...USER_1_DATA,
                id: 4,
                hash: 'hash',
                salt: 'salt',
                refreshTokens: Promise.resolve([]),
            },
        ];

        jest.spyOn(repo, 'create').mockReturnValue(RETURN_DATA[0]);
        await service.create(USER_1_DATA);
        await service.create(USER_1_DATA);
        await service.create(USER_1_DATA);
        await service.create(USER_1_DATA);

        jest.spyOn(repo, 'find').mockResolvedValueOnce(RETURN_DATA);
        const foundUsers = await service.findAll();

        expect(foundUsers).toHaveLength(4);

        const firstUserId = foundUsers[0].id;

        expect(foundUsers.filter(({ id }) => id === firstUserId)).toHaveLength(
            1,
        );
    });
});
