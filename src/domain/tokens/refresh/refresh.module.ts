import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshTokenEntity } from 'src/domain/tokens/entities/refresh-token.entity';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { RefreshService } from './refresh.service';

@Module({
    imports: [TypeOrmModule.forFeature([RefreshTokenEntity, UserEntity])],
    providers: [RefreshService],
    exports: [RefreshService],
})
export class RefreshModule {}
