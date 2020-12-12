import { Injectable } from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { hash, compare } from 'bcryptjs';

import { ComparePasswordsPayload } from './interfaces/compare-passwords.interface';
import { hasherConstants } from './constants';

@Injectable()
export class PasswordHasherService {
    async hashPassword(password: string): Promise<[string, string]> {
        const salt = randomStringGenerator();
        const passwordHash = await hash(
            password + salt,
            hasherConstants.rounds,
        );
        return [passwordHash, salt];
    }

    async comparePasswords({
        providedPass,
        storedPass,
        salt,
    }: ComparePasswordsPayload): Promise<boolean> {
        return await compare(providedPass + salt, storedPass);
    }
}
