import {
    Controller,
    Post,
    Body,
    HttpCode,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto'
import { SignInDto } from './dto/signin.dto';
import { UserProfile } from 'src/users/interfaces/user-profile.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post('/signup')
    async signup(@Body() signUpDto: SignUpDto): Promise<void> {
        await this.authService.signUp(signUpDto);
    }

    @Post('/signin')
    @HttpCode(200)
    async signin(@Body() signInDto: SignInDto): Promise<UserProfile> {
        const userProfile = await this.authService.verifyCredentials(signInDto);

        return userProfile;
    }
}
