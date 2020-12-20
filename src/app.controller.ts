import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { JWTGuard } from './auth/guards/jwt.guard';
import { UserDto } from './users/dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): { text: string } {
        return this.appService.getHello();
    }

    @UseGuards(JWTGuard)
    @Get('me')
    me(@Request() { user }: { user: UserDto }): { user: UserDto } {
        return { user };
    }
}
