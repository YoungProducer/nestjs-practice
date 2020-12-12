import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';

@Module({
    imports: [ConfigModule.register({ folder: './config' })],
    exports: [ConfigModule],
})
export class PredefinedConfigModule {}
