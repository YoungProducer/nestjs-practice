import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dto';

@Exclude()
export class LoginResponseDto {
    @Expose()
    @Type(() => UserDto)
    user: UserDto;

    @Expose()
    accessToken: string;

    @Expose()
    refreshToken: string;
}
