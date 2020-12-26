import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class SignUpDto {
    @IsString()
    @IsNotEmpty({
        message: 'Name is missed in request body!',
    })
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty({
        message: 'Email is missed in request body!',
    })
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty({
        message: 'Password is missed in request body!',
    })
    @ApiProperty()
    password: string;
}
