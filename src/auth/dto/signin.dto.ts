import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class SignInDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty({
        message: 'Password is missed in request body!',
    })
    password: string;
}
