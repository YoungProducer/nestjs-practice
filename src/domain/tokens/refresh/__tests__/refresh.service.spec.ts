import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RefreshTokenEntity } from 'src/domain/tokens/entities/refresh-token.entity';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { RefreshService } from '../refresh.service';

describe('JWTService', () => {
    let service: RefreshService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RefreshService,
                {
                    provide: getRepositoryToken(RefreshTokenEntity),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(UserEntity),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<RefreshService>(RefreshService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
