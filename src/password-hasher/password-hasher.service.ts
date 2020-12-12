import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcryptjs';

import { ComparePasswordsPayload } from './interfaces/compare-passwords.interface';
import { hasherConstants } from './constants';

@Injectable()
export class PasswordHasherService {
    async hashPassword(password: string): Promise<[string, string]> {
        const salt = await genSalt(hasherConstants.rounds);
        const passwordHash = await hash(password, salt);
        return [passwordHash, salt];
    }

    async comparePasswords({
        providedPass,
        storedPass,
    }: ComparePasswordsPayload): Promise<boolean> {
        return await compare(providedPass, storedPass);
    }
}
