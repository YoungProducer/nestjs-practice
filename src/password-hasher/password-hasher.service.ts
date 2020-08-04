import { Injectable } from '@nestjs/common';
import {
    genSalt,
    hash,
    compare,
} from 'bcryptjs';

import { ComparePasswordsPayload } from './interfaces/compare-passwords.interface';
import { hasherContants } from './constants';

@Injectable()
export class PasswordHasherService {
    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(hasherContants.rounds);
        return await hash(password, salt);
    }

    async comparePasswords({
        providedPass,
        storedPass,
    }: ComparePasswordsPayload): Promise<boolean> {
        return await compare(providedPass, storedPass);
    }
}
