import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokenEntity } from 'src/domain/tokens/entities/refresh-token.entity';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { RefreshService } from 'src/domain/tokens/refresh/refresh.service';

@Module({
    providers: [
        RefreshService,
        {
            provide: getRepositoryToken(RefreshTokenEntity),
            useClass: Repository,
        },
        {
            provide: getRepositoryToken(UserEntity),
            useClass: Repository,
        },
    ],
    exports: [RefreshService],
})
export class MockedRefreshModule {}
