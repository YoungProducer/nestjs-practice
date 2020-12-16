import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from 'src/config/config.service';
import { PredefinedConfigModule } from 'src/predefined/modules';
import { UserDto } from 'src/users/dto/user.dto';
import { getConfigValue } from 'src/__mocks__/getConfigValue.mock';
import { JWTService } from './jwt.service';

describe('JWTService', () => {
    let service: JWTService;
    let configService: ConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PredefinedConfigModule],
            providers: [JWTService],
        }).compile();

        service = module.get<JWTService>(JWTService);
        configService = module.get<ConfigService>(ConfigService);

        jest.spyOn(configService, 'get').mockImplementation(getConfigValue);
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
