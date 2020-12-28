import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { RefreshPayloadDto, RefreshResponseDto } from './dto';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
    constructor(private tokensService: TokensService) {}

    @Post('/refresh')
    @HttpCode(200)
    async refresh(
        @Body() refreshPayloadDto: RefreshPayloadDto,
    ): Promise<RefreshResponseDto> {
        const [accessToken, refreshToken] = await this.tokensService.refresh(
            refreshPayloadDto.refreshToken,
        );

        return plainToClass(RefreshResponseDto, { accessToken, refreshToken });
    }
}
