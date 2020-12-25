import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/domain/tokens/refresh/node_modules/src/domain/auth/node_modules/src/entities/user.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/domain/auth/node_modules/src/users/users.service';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: getRepositoryToken(UserEntity),
            useClass: Repository,
        },
    ],
    exports: [UsersService],
})
export class MockedUsersModule {}
