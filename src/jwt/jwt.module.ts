import { Module } from '@nestjs/common';

import { PredefinedConfigModule } from 'src/predefined/modules';
import { JWTService } from './jwt.service';

@Module({
    imports: [PredefinedConfigModule],
    providers: [JWTService],
    exports: [JWTService],
})
export class JWTModule {}
