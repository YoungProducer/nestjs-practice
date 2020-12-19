import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { LoginResponseDto } from './dto';
import { TokensService } from 'src/tokens/tokens.service';
import { UserDto } from 'src/users/dto/user.dto';

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
