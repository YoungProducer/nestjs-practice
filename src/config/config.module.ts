import * as path from 'path';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { DynamicModule, Module } from '@nestjs/common';

import { DI_CONFIG } from './constants';
import { EnvConfig } from './interfaces';

export interface ConfigModuleOptions {
    folder: string;
}

const configFactory = (options: ConfigModuleOptions) => ({
    provide: DI_CONFIG,
    useFactory: (): EnvConfig => {
        const fileName = `${process.env.NODE_ENV || 'development'}.env`;
        const envFile = path.resolve(
            __dirname,
            '../..',
            options.folder,
            fileName,
        );
        return (dotenv.parse(fs.readFileSync(envFile)) as unknown) as EnvConfig;
    },
});

@Module({})
export class ConfigModule {
    static register(options: ConfigModuleOptions): DynamicModule {
        const configProvider = configFactory(options);

        return {
            module: ConfigModule,
            providers: [configProvider],
            exports: [configProvider],
        };
    }
}

@Module({
    imports: [ConfigModule.register({ folder: './configs' })],
    exports: [ConfigModule],
})
export class PredefinedConfigModule {}
