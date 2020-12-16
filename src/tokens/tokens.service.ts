import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/users/dto/user.dto';
import { JWTService } from './jwt/jwt.service';
import { RefreshService } from './refresh/refresh.service';

@Injectable()
export class TokensService {
    constructor(
        private jwtService: JWTService,
        private refreshService: RefreshService,
    ) {}

    async issueTokensPair(user: UserDto): Promise<[string, string]> {
        const accessToken = await this.jwtService.sign(user);
        const refreshToken = await this.refreshService.create(user.id);

        return [accessToken, refreshToken];
    }
}
