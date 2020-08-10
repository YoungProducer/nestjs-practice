import {
    Controller,
    Post,
    Body,
    HttpCode,
    UseGuards,
    Request,
} from '@nestjs/common';
import { Request as Req } from 'express';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto'
import { SignInDto } from './dto/signin.dto';
import { UserProfile } from 'src/users/interfaces/user-profile.interface';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    async signup(@Body() signUpDto: SignUpDto): Promise<void> {
        await this.authService.signUp(signUpDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/signin')
    @HttpCode(200)
    async signin(
        @Request() req: Req,
        @Body() signInDto: SignInDto,
    ): Promise<UserProfile> {
        console.log(req.user);

        const userProfile = await this.authService.verifyCredentials(signInDto);

        return userProfile;
    }
}
