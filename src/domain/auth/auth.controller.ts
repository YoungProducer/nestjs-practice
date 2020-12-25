import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';

import { TokensService } from 'src/domain/tokens/tokens.service';
import { UserDto } from 'src/domain/users/dto';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto, LoginResponseDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private tokensService: TokensService,
    ) {}

    @Post('/signup')
    async signup(@Body() signUpDto: SignUpDto): Promise<void> {
        await this.authService.signUp(signUpDto);
    }

    @Post('/signin')
    @HttpCode(200)
    async signin(@Body() signInDto: SignInDto): Promise<LoginResponseDto> {
        const user = await this.authService.verifyCredentials(signInDto);

        const [
            accessToken,
            refreshToken,
        ] = await this.tokensService.issueTokensPair(
            classToPlain(user) as UserDto,
        );

        const preparedResponse: LoginResponseDto = {
            user,
            accessToken,
            refreshToken,
        };

        return plainToClass(LoginResponseDto, preparedResponse);
    }
}
