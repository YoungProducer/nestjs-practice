import { Controller, Post, Body, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    async create(@Body() createUserDto: Omit<UserDto, 'id'>): Promise<User> {
        return await this.userService.create(createUserDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(parseInt(id, 10));
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
