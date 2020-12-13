import { Controller, Post, Body, HttpCode, Request } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Request as Req } from 'express';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { LoginResponseDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() signUpDto: SignUpDto): Promise<void> {
        await this.authService.signUp(signUpDto);
    }

    @Post('/signin')
    @HttpCode(200)
    async signin(
        @Request() req: Req,
        @Body() signInDto: SignInDto,
    ): Promise<LoginResponseDto> {
        const user = await this.authService.verifyCredentials(signInDto);

        return plainToClass(LoginResponseDto, { user });
    }
}
