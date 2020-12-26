import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { EnvConfig } from 'src/config/interfaces';

export const getTypeOrmOptions = (config: EnvConfig): TypeOrmModuleOptions => {
    const entitiesNames = '*.entity{.ts,.js}';
    const entitiesPath = path.resolve(
        __dirname,
        '../../../',
        '**',
        entitiesNames,
    );

    return {
        type: config.DB_TYPE as any,
        host: config.DB_HOST,
        port: +config.DB_PORT,
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        database: config.DB_NAME,
        entities: [entitiesPath],
        synchronize: config.SYNC === 'TRUE',
    };
};
