import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_OPTIONS } from './constants';

import { ConfigOptions, EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
        const fileName = `${process.env.NODE_ENV || 'development'}.env`;
        const envFile = path.resolve(
            __dirname,
            '../../',
            options.folder,
            fileName,
        );
        this.envConfig = (dotenv.parse(
            fs.readFileSync(envFile),
        ) as unknown) as EnvConfig;
    }

    get(key: keyof EnvConfig): string {
        return this.envConfig[key];
    }
}
