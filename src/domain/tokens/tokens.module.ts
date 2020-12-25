import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PredefinedConfigModule } from 'src/config/config.module';
import { RefreshTokenEntity } from 'src/domain/tokens/entities/refresh-token.entity';
import { JWTModule } from './jwt/jwt.module';
import { RefreshModule } from './refresh/refresh.module';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
    imports: [
        PredefinedConfigModule,
        JWTModule,
        RefreshModule,
        TypeOrmModule.forFeature([RefreshTokenEntity]),
    ],
    controllers: [TokensController],
    providers: [TokensService],
    exports: [JWTModule, RefreshModule, TokensService],
})
export class TokensModule {}
