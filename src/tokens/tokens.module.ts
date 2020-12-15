import { Module } from '@nestjs/common';
import { JWTModule } from './jwt/jwt.module';

@Module({
    imports: [JWTModule],
    exports: [JWTModule],
})
export class TokensModule {}
