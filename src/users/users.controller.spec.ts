import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('Users Controller', () => {
    let controller: UsersController;

    beforeEach(async () => {
        const repositoryToken = getRepositoryToken(UserEntity);

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                UsersService,
                {
                    provide: repositoryToken,
                    useClass: Repository,
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
