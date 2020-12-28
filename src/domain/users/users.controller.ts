import { Controller, Post, Body, Get, Param, HttpCode } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDto } from './dto';
import { UserEntity } from './entities/user.entity';
import { SignUpDto } from 'src/domain/auth/dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @HttpCode(200)
    async create(@Body() createUserData: SignUpDto): Promise<UserDto> {
        return await this.userService.create(createUserData);
    }

    @Post('/verify/:token')
    @HttpCode(200)
    async verifyEmail(@Param('token') token: string): Promise<void> {
        await this.userService.verify({ token });
    }

    @Get(':id')
    @HttpCode(200)
    async findOne(@Param('id') id: string): Promise<UserEntity> {
        return this.userService.findOne(parseInt(id, 10));
    }

    @Get()
    @HttpCode(200)
    async findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }
}
