import {
    Controller,
    Post,
    Body,
    BadRequestException,
    NotFoundException,
    UnauthorizedException,
    HttpCode,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signup.dto'
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UsersService
    ) {}

    @Post('/signup')
    async signup(@Body() signUpDto: SignUpDto): Promise<void> {
        if (!signUpDto.email && !signUpDto.name) {
            throw new BadRequestException(
                'Request body should has name or email of user!',
            );
        }

        this.userService.create(signUpDto);
    }

    @Post('/signin')
    @HttpCode(200)
    async signin(@Body() signInDto: SignInDto): Promise<string> {
        const user = await this.userService.findOne({ ...signInDto });

        if (!user) {
            throw new NotFoundException(
                'There is no user with provided email or username!',
            );
        }

        if (user.password !== signInDto.password) {
            throw new UnauthorizedException(
                'Wrong password!',
            );
        }

        return 'Successfully logged in!';
    }
}
