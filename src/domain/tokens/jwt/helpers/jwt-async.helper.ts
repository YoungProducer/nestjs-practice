import { sign as signSync, verify as verifySync } from 'jsonwebtoken';

import { SignType, VerifyType } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pify = require('pify');

export const sign = pify(signSync) as SignType;
export const verify: VerifyType = pify(verifySync);
