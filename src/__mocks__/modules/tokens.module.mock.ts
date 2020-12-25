import { Module } from '@nestjs/common';
import { JWTModule } from 'src/domain/tokens/jwt/jwt.module';
import { MockedRefreshModule } from './refresh.module.mock';

@Module({
    imports: [JWTModule, MockedRefreshModule],
    exports: [JWTModule, MockedTokensModule],
})
export class MockedTokensModule {}
