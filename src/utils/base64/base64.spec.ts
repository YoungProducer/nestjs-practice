import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { b64DecodeUnicode } from './decode';
import { b64EncodeUnicode } from './encode';

describe('base 64', () => {
    it('should encode', () => {
        const stringToEncode = randomStringGenerator();

        const encoded = b64EncodeUnicode(stringToEncode);

        expect(typeof encoded).toBe('string');
    });

    it('should decode correct string', () => {
        const stringToEncode = randomStringGenerator();

        const encoded = b64EncodeUnicode(stringToEncode);
        const decoded = b64DecodeUnicode(encoded);

        expect(decoded).toBe(stringToEncode);
    });
});
