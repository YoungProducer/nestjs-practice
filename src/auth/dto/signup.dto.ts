import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class SignUpDto {
    @IsString()
    @IsNotEmpty({
        message: 'Name is missed in request body!',
    })
    name: string;

    @IsString()
    @IsNotEmpty({
        message: 'Email is missed in request body!',
    })
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty({
        message: 'Password is missed in request body!',
    })
    password: string;
}
