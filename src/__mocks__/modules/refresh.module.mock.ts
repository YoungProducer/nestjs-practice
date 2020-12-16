import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RefreshTokenEntity } from 'src/entities/refres-token.entity';
import { UserEntity } from 'src/entities/user.entity';
import { RefreshService } from 'src/tokens/refresh/refresh.service';
import { Repository } from 'typeorm';

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
