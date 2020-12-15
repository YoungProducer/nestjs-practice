import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { EnvConfig } from 'src/config/interfaces';

const pathToConfig = path.resolve(__dirname, '../../', 'config', 'test.env');
const config = (dotenv.parse(
    fs.readFileSync(pathToConfig),
) as unknown) as EnvConfig;

export const getConfigValue = (name: string): string => config[name];
