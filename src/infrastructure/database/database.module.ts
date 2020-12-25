import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PredefinedConfigModule } from 'src/config/config.module';
import { DI_CONFIG } from 'src/config/constants';
import { getTypeOrmOptions } from './helpers/getTypeOrmOptions';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [PredefinedConfigModule],
            useFactory: getTypeOrmOptions,
            inject: [DI_CONFIG],
        }),
    ],
})
export class DataBaseModule {}
