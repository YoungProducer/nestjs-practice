import { Test, TestingModule } from '@nestjs/testing';

import { PredefinedConfigModule } from 'src/predefined/modules/config.module';
import { UserDto } from 'src/domain/users/dto';
import { JWTService } from './jwt.service';

describe('JWTService', () => {
    let service: JWTService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PredefinedConfigModule],
            providers: [JWTService],
        }).compile();

        service = module.get<JWTService>(JWTService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return valid token', async () => {
        const user: UserDto = {
            email: 'email',
            id: 1,
            name: 'name',
        };

        const token = await service.sign(user);

        expect(token).toEqual(expect.stringContaining('Bearer '));
        expect(token.slice(7).split('.')).toHaveLength(3);
    });

    it('should return user dto on verify', async () => {
        const user: UserDto = {
            email: 'email',
            id: 1,
            name: 'name',
        };

        const token = await service.sign(user);
        const clearToken = token.slice(7);

        const userDto = await service.verify(clearToken);

        expect(user).toEqual(expect.objectContaining(userDto));
    });

    it('should return error if token is invalid', async () => {
        try {
            await service.verify('dwadwadwa.dwad.awdwa');
        } catch (e) {
            expect(e.message).toBe('invalid token');
        }
    });
});
