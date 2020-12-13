import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigService } from 'src/config/config.service';

export const getTypeOrmOptions = (
    configService: ConfigService,
): TypeOrmModuleOptions => {
    const entitiesNames = '*.entity{.ts,.js}';
    const entitiesPath = path.resolve(__dirname, '..', '**', entitiesNames);

    return {
        type: configService.get('DB_TYPE') as any,
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [entitiesPath],
        synchronize: configService.get('SYNC') === 'TRUE',
    };
};
