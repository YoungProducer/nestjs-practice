import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService],
        }).compile();

        service = module.get<UsersService>(UsersService);
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

        await service.create(USER_1_DATA);
        await service.create(USER_2_DATA);

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

        await service.create(USER_1_DATA);
        await service.create(USER_1_DATA);
        await service.create(USER_1_DATA);
        await service.create(USER_1_DATA);

        const foundUsers = await service.findAll();

        expect(foundUsers).toHaveLength(4);

        const firstUserId = foundUsers[0].id;

        expect(foundUsers.filter(({ id }) => id === firstUserId)).toHaveLength(
            1,
        );
    });
});
