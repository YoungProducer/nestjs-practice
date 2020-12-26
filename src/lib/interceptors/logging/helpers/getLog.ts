import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as chalk from 'chalk';
import * as moment from 'moment';

import { GetLogParams } from '../interfaces';

export const getLog = ({
    start,
    executionTime,
    statusCode,
    curlString,
    error,
}: GetLogParams): string => `
${chalk.magenta('#################################')}
${chalk.green('Request id:')} ${chalk.yellow(randomStringGenerator())}
${chalk.green('Request time:')} ${moment(new Date(start)).format(
    'MM/DD/YYYY, HH:mm:ss A',
)}
${chalk.green('Execution time:')} ${chalk.yellow(executionTime, 'ms')}
${chalk.green('Response status:')} ${chalk[error ? 'red' : 'yellow'](
    statusCode,
)}
${chalk.green('Curl:')} ${chalk.yellow(curlString)}
${chalk.magenta('#################################')}\n`;
