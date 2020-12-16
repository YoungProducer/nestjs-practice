import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokenEntity } from 'src/entities/refresh-token.entity';
import { UserEntity } from 'src/entities/user.entity';
import { RefreshService } from 'src/tokens/refresh/refresh.service';

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
