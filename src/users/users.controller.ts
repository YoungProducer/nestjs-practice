import { Controller, Post, Body, Get } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {};

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<void> {
        this.userService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
