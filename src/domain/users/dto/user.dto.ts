import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class UserDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
