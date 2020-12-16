import { Module } from '@nestjs/common';
import { JWTModule } from './jwt/jwt.module';
import { RefreshModule } from './refresh/refresh.module';
import { TokensService } from './tokens.service';

@Module({
    imports: [JWTModule, RefreshModule],
    providers: [TokensService],
    exports: [JWTModule, RefreshModule, TokensService],
})
export class TokensModule {}
